use serde_json::json;
use vercel_runtime::{http, run, Body, Error, Request, Response};

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

pub async fn handler(_: Request) -> Result<Response<Body>, Error> {
    http::ok(json!({
        "success": true,
         "payload": "hello there!"
    }))
}
