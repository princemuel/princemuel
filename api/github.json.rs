use dotenv::dotenv;
use octocrab::Octocrab;
use serde_json::json;
use vercel_runtime::{http, run, Body, Error, Request, Response};

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

pub async fn handler(_: Request) -> Result<Response<Body>, Error> {
    dotenv().ok();
    let token =
        std::env::var("OCTOKIT_TOKEN").expect("OCTOKIT_TOKEN must be set");
    let octokit = Octocrab::builder().personal_token(token).build()?;

    let user = octokit.current().user().await?;

    let url = format!("/users/{:?}/events?per_page={}", user.login, 20);

    println!("URL {url}");

    http::ok(json!({
        "success": true,
        "username": format!("Authenticated user: {:?}", user.login)
    }))
}
