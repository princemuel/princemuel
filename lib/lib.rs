use prisma_client_rust::NewClientError;
use serde::Serialize;
use vercel_runtime::{Body, Error, Response, StatusCode};

#[cfg(feature = "prisma_generated")]
#[allow(warnings, unused)]
pub mod prisma;

#[cfg(feature = "prisma_generated")]
use prisma::PrismaClient;

#[cfg(feature = "prisma_generated")]
async fn get_client() -> Result<PrismaClient, prisma_client_rust::NewClientError> {
    prisma::new_client().await
}

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
