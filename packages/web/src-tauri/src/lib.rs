use serde::{Deserialize, Serialize};
use tauri::{command, AppHandle, Manager};
use serde_json;
use std::sync::Mutex;
use std::fs;

// 全局状态存储服务器地址
static BACKEND_URL: Mutex<Option<String>> = Mutex::new(None);

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
async fn proxy_request(request: ProxyRequest) -> Result<ProxyResponse, String> {
    let backend_url: String = get_backend_url();
    let full_url: String = format!("{}{}", backend_url, request.url);
    
    let client: reqwest::Client = reqwest::Client::new();
    
    let mut req: reqwest::RequestBuilder = match request.method.to_uppercase().as_str() {
        "GET" => client.get(&full_url),
        "POST" => client.post(&full_url),
        "PUT" => client.put(&full_url),
        "DELETE" => client.delete(&full_url),
        "PATCH" => client.patch(&full_url),
        _ => client.get(&full_url),
    };

    // 设置请求头
    if let Some(headers) = request.headers {
        if let Some(obj) = headers.as_object() {
            for (key, value) in obj {
                if let Some(val_str) = value.as_str() {
                    if key == "x-original-url" {
                        req = req.header(key, &request.url); // 使用原始相对路径
                    } else {
                        req = req.header(key, val_str);
                    }
                }
            }
        }
    }
    
    // 如果没有x-original-url头部，添加它
    req = req.header("x-original-url", &request.url);

    // 设置请求体
    if let Some(body) = request.body {
        if request.method.to_uppercase() != "GET" {
            req = req.body(body);
        }
    }

    let res: reqwest::Response = req.send().await.map_err(|e: reqwest::Error| e.to_string())?;
    
    let status: reqwest::StatusCode = res.status();
    let status_text: String = res.status().canonical_reason().unwrap_or("Unknown").to_string();
    
    // 收集响应头
    let mut headers_map: serde_json::Map<String, serde_json::Value> = serde_json::Map::new();
    for header_name in res.headers().keys() {
        if let Some(header_value) = res.headers().get(header_name) {
            if let Ok(value_str) = header_value.to_str() {
                headers_map.insert(header_name.to_string(), serde_json::Value::String(value_str.to_string()));
            }
        }
    }
    
    let response_text: String = res.text().await.map_err(|e: reqwest::Error| e.to_string())?;
    let data: serde_json::Value = serde_json::from_str(&response_text).unwrap_or_else(|_| serde_json::Value::String(response_text));

    Ok(ProxyResponse {
        data,
        status: status.as_u16(),
        status_text,
        headers: serde_json::Value::Object(headers_map),
    })
}

#[command]
async fn set_server_url(app_handle: AppHandle, url: String) -> Result<(), String> {
    let mut backend_url: std::sync::MutexGuard<'_, Option<String>> = BACKEND_URL.lock().map_err(|e: std::sync::PoisonError<std::sync::MutexGuard<'_, Option<String>>>| e.to_string())?;
    *backend_url = Some(url.clone());
    
    // 保存到配置文件
    if let Ok(app_dir) = app_handle.path().app_config_dir() {
        let _ = fs::create_dir_all(&app_dir);
        let config_path: std::path::PathBuf = app_dir.join("server_config.json");
        let _ = fs::write(config_path, serde_json::to_string_pretty(&serde_json::json!({"server_url": url})).unwrap_or_default());
    }
    
    Ok(())
}

#[command]
async fn get_server_url(app_handle: AppHandle) -> Result<String, String> {
    let backend_url: std::sync::MutexGuard<'_, Option<String>> = BACKEND_URL.lock().map_err(|e: std::sync::PoisonError<std::sync::MutexGuard<'_, Option<String>>>| e.to_string())?;
    if let Some(url) = backend_url.as_ref() {
        return Ok(url.clone());
    }
    drop(backend_url);
    
    if let Ok(app_dir) = app_handle.path().app_config_dir() {
        let config_path: std::path::PathBuf = app_dir.join("server_config.json");
        if let Ok(config_content) = fs::read_to_string(config_path) {
            if let Ok(config) = serde_json::from_str::<serde_json::Value>(&config_content) {
                if let Some(server_url) = config.get("server_url").and_then(|v: &serde_json::Value| v.as_str()) {
                    let mut backend_url: std::sync::MutexGuard<'_, Option<String>> = BACKEND_URL.lock().map_err(|e: std::sync::PoisonError<std::sync::MutexGuard<'_, Option<String>>>| e.to_string())?;
                    *backend_url = Some(server_url.to_string());
                    return Ok(server_url.to_string());
                }
            }
        }
    }
      
    Ok("http://127.0.0.1:7777".to_string())
}

fn get_backend_url() -> String {
    let backend_url: std::sync::MutexGuard<'_, Option<String>> = BACKEND_URL.lock().unwrap();
    backend_url.clone().unwrap_or_else(|| "http://127.0.0.1:7777".to_string())
}

/**
 * 开始拖拽窗口
 */
#[command]
async fn start_drag(window: tauri::WebviewWindow) -> Result<(), String> {
    window.start_dragging().map_err(|e| e.to_string())
}

pub fn run() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![proxy_request, set_server_url, get_server_url, start_drag])
      .setup(|_app: &mut tauri::App| {
          #[cfg(debug_assertions)]
          {
            let window: tauri::WebviewWindow<_> = _app.get_webview_window("main").unwrap();
            window.open_devtools();
            window.close_devtools();
          }
          Ok(())
      })
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}