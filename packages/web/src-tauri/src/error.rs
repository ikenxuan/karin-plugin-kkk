#[derive(Debug)]
pub enum Error{
    Request(String),
    Config(String),
}

impl std::fmt::Display for Error {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Error::Request(e) => write!(f, "请求错误: {}", e),
            Error::Config(e) => write!(f, "配置错误: {}", e),
        }
    }
}

impl std::error::Error for Error {}

impl From<Error> for tauri::Error {
    fn from(error: Error) -> Self {
        tauri::Error::Anyhow(anyhow::anyhow!(error))
    }
}

impl From<reqwest::Error> for Error {
    fn from(error: reqwest::Error) -> Self {
        Error::Request(error.to_string())
    }
}
