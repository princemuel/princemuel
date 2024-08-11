use octokit_rs::webhook::*;
use reqwest::header::{
    HeaderMap, HeaderValue, ACCEPT, AUTHORIZATION, USER_AGENT,
};
use reqwest::Error as RequestError;
use reqwest::{Client as RequestClient, ClientBuilder};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::env;
use vercel_runtime::{http, run, Body, Error, Request, Response};

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

pub async fn handler(_: Request) -> Result<Response<Body>, Error> {
    let config =
        Config::from_env().expect("Failed to load environment variables");

    let client = build_client(&config)?;
    let url = format!(
        "{}/users/{}/events",
        config.octokit_url, config.octokit_username
    );

    let response = client.get(&url).send().await?;
    let code = response.status();

    let response_text = response.text().await?;

    let events: Vec<GithubEvent> = serde_json::from_str(&response_text)?;

    http::ok(json!({
        "success":  code == 200,
        "payload": events
    }))
}

fn build_client(config: &Config) -> Result<RequestClient, RequestError> {
    let token = String::from("Bearer ") + &config.octokit_token;

    let mut headers = HeaderMap::new();

    headers.insert(
        ACCEPT,
        HeaderValue::from_static("application/vnd.github+json"),
    );
    headers.insert(
        AUTHORIZATION,
        HeaderValue::from_str(&token).expect("Invalid header value"),
    );
    headers.insert(
        "X-GitHub-Api-Version",
        HeaderValue::from_str(&config.octokit_version)
            .expect("Invalid header value"),
    );
    headers.insert(
        USER_AGENT,
        HeaderValue::from_str(&config.octokit_username)
            .expect("Invalid header value"),
    );

    ClientBuilder::new().default_headers(headers).build()
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
pub enum GithubEvent {
    CreateEvent(Box<CreateEvent>),
    DeleteEvent(Box<DeleteEvent>),
    ForkEvent(Box<ForkEvent>),
    IssueCommentEvent(Box<IssueCommentEvent>),
    PublicEvent(Box<PublicEvent>),
    PullEvent(Box<PullRequestEvent>),
    PushEvent(Box<PushEvent>),
    WatchEvent(Box<WatchEvent>),
    Other(Value),
}

#[derive(Debug, Clone)]
struct Config {
    octokit_token: String,
    octokit_username: String,
    octokit_version: String,
    octokit_url: String,
}

impl Config {
    fn from_env() -> Result<Self, String> {
        dotenv::dotenv().ok();

        Ok(Self {
            octokit_token: env::var("OCTOKIT_TOKEN")
                .map_err(|_| "Environment Variable OCTOKIT_TOKEN not set")?,
            octokit_username: env::var("OCTOKIT_USERNAME")
                .map_err(|_| "Environment Variable OCTOKIT_USERNAME not set")?,
            octokit_version: env::var("OCTOKIT_VERSION")
                .map_err(|_| "Environment Variable OCTOKIT_VERSION not set")?,
            octokit_url: env::var("OCTOKIT_URL")
                .map_err(|_| "Environment Variable OCTOKIT_URL not set")?,
        })
    }
}
