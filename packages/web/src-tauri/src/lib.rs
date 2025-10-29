mod config;
mod error;

use crate::{
    config::{APP_CONFIG, Config},
    error::Error,
};
use serde::{Deserialize, Serialize};
use std::{
    fs,
    sync::{LazyLock, Mutex},
};
use tauri::{AppHandle, Manager, command};

static HTTP_CLIENT: LazyLock<Mutex<reqwest::Client>> =
    LazyLock::new(|| Mutex::new(reqwest::Client::new()));

#[derive(Deserialize)]
struct ProxyRequest {
    url: String,
    method: String,
    body: Option<String>,
    headers: Option<serde_json::Value>,
}

#[derive(Serialize)]
struct ProxyResponse {
    data: serde_json::Value,
    status: u16,
    status_text: String,
    headers: serde_json::Value,
}

#[command]
async fn request(request: ProxyRequest) -> tauri::Result<ProxyResponse> {
    let base_url = APP_CONFIG.read().unwrap().get_server_url();
    let full_url = format!("{}{}", base_url, request.url);

    let client = HTTP_CLIENT.lock().unwrap().clone();

    let mut req: reqwest::RequestBuilder = match request.method.to_uppercase().as_str() {
        "GET" => client.get(&full_url),
        "POST" => client.post(&full_url),
        "PUT" => client.put(&full_url),
        "DELETE" => client.delete(&full_url),
        "PATCH" => client.patch(&full_url),
        _ => client.get(&full_url),
    };

    if let Some(headers) = &request.headers {
        if let Some(obj) = headers.as_object() {
            for (key, value) in obj.iter() {
                if let Some(val_str) = value.as_str() {
                    req = if key == "x-original-url" {
                        req.header(key, &request.url)
                    } else {
                        req.header(key, val_str)
                    };
                }
            }
        }
    }

    req = req.header("x-original-url", &request.url);

    if let Some(body) = request.body {
        if request.method.to_uppercase() != "GET" {
            req = req.body(body);
        }
    }

    let res = req.send().await.map_err(|e| Error::from(e))?;

    let status = res.status();
    let status_text = res
        .status()
        .canonical_reason()
        .unwrap_or("Unknown")
        .to_string();

    let headers_map = res
        .headers()
        .iter()
        .filter_map(|(name, value)| {
            value
                .to_str()
                .ok()
                .map(|val_str| (name.to_string(), serde_json::Value::String(val_str.into())))
        })
        .collect();

    let data = res.json().await.map_err(|e| Error::from(e))?;

    Ok(ProxyResponse {
        data,
        status: status.as_u16(),
        status_text,
        headers: serde_json::Value::Object(headers_map),
    })
}

#[command]
async fn set_server_url(app_handle: AppHandle, url: String) -> tauri::Result<()> {
    {
        let mut app_config = APP_CONFIG.write().unwrap();
        app_config.set_server_url(url);
    }

    let app_config = APP_CONFIG.read().unwrap();
    let app_config_path = app_handle
        .path()
        .app_config_dir()
        .map_err(tauri::Error::from)?
        .join("app.json");

    fs::write(app_config_path, serde_json::to_string_pretty(&*app_config)?)
        .map_err(tauri::Error::from)?;

    Ok(())
}

#[command]
fn get_server_url() -> String {
    let app_config = APP_CONFIG.read().unwrap();
    app_config.get_server_url()
}
/**
 * 开始拖拽窗口
 */
#[command]
async fn start_drag(window: tauri::Window) -> Result<(), tauri::Error> {
    #[cfg(any(target_os = "windows", target_os = "macos", target_os = "linux"))]
    {
        window.start_dragging()?;
    }

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            request,
            set_server_url,
            get_server_url,
            start_drag
        ])
        .setup(|app| {
            #[cfg(debug_assertions)]
            {
                let window = app.get_webview_window("main").unwrap();
                window.open_devtools();
            }

            if let Ok(app_config_dir) = app.path().app_config_dir() {
                let _ = fs::create_dir_all(&app_config_dir);
                let config_path = app_config_dir.join("app.json");

                if !config_path.exists() {
                    let default_config = Config::default();
                    fs::write(
                        &config_path,
                        serde_json::to_string_pretty(&default_config).unwrap_or_default(),
                    )
                    .unwrap();
                }

                if let Ok(config) = fs::read_to_string(config_path) {
                    let config: Config = serde_json::from_str(&config).unwrap();
                    let mut app_config = APP_CONFIG.write().unwrap();
                    app_config.set_server_url(config.server_url);
                }
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
