use std::sync::{LazyLock, RwLock};
use serde::{Deserialize, Serialize};


#[derive(Debug, Serialize, Deserialize)]
pub (crate) struct Config {
    #[serde(default = "default_server_url")]
    pub (crate) server_url: String,
}

fn default_server_url() -> String {
    "http://localhost:7777".to_string()
}
impl Default for Config {
    fn default() -> Self {
        Self {
            server_url: default_server_url(),
        }
    }
}

impl Config {

    pub fn new() -> Self {
        Self::default()
    }
    pub fn set_server_url(&mut self, url: String) {
        self.server_url = url;
    }
    pub fn get_server_url(&self) -> String {
        self.server_url.clone()
    }
}
pub (crate) static APP_CONFIG: LazyLock<RwLock<Config>> = LazyLock::new(|| RwLock::new(Config::new()));
