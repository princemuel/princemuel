use serde::Serialize;
use vercel_runtime::{Body, Error, Response, StatusCode};

pub fn method_not_allowed(
    val: impl Serialize,
) -> Result<Response<Body>, Error> {
    Ok(Response::builder()
        .status(StatusCode::METHOD_NOT_ALLOWED)
        .header("content-type", "application/json")
        .body(Body::Text(serde_json::to_string(&val).unwrap()))?)
}
