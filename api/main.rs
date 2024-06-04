use vercel_runtime::{bundled_api, run, Body, Error, Request, Response};

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

// The proc macro `bundled_api` injects a router for all `api/**/*.rs` handler files.
#[bundled_api]
pub async fn handler(req: Request) -> Result<Response<Body>, Error> {}
