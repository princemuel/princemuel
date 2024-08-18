use prisma_client_rust::NewClientError;
use serde::Serialize;
use vercel_runtime::{Body, Error, Response, StatusCode};

#[allow(warnings, unused)]
pub mod prisma;
use prisma::PrismaClient;

pub fn method_not_allowed(
    val: impl Serialize,
) -> Result<Response<Body>, Error> {
    Ok(Response::builder()
        .status(StatusCode::METHOD_NOT_ALLOWED)
        .header("content-type", "application/json")
        .body(Body::Text(serde_json::to_string(&val).unwrap()))?)
}

// Function to get the database client after initialization
pub async fn get_db_client() -> Result<PrismaClient, NewClientError> {
    Ok(prisma::new_client().await?)
}
