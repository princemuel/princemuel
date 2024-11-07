use http::Method;
use vercel_runtime::{run, Body, Error, Request, Response, StatusCode};

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

pub async fn handler(request: Request) -> Result<Response<Body>, Error> {
    match request.method() {
        &Method::GET => Ok(Response::builder()
            .status(StatusCode::OK)
            .header("Content-Type", "text/plain")
            .body(
                "Hi there! I'm healthy...Thanks for checking up on me!".into(),
            )?),
        _ => Ok(Response::builder()
            .status(StatusCode::NOT_FOUND)
            .body(Body::Empty)?),
    }
}
