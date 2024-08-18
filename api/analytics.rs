use lazy_regex::regex_is_match;
use package::get_db_client;
use package::prisma::analytics;
use reqwest::header::HeaderValue;
use serde::{Deserialize, Serialize};
use serde_json::json;
use vercel_runtime::{
    http, run, Body, Error, Request, RequestPayloadExt, Response,
};

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

#[derive(Debug, Default, Serialize, Deserialize)]
struct Args {
    name: String,
    version: String,
    pathname: String,
    referrer: String,
}

#[derive(Debug, Default, Serialize, Deserialize)]
struct Geo {
    city: Option<String>,
    country: Option<String>,
    flag: Option<String>,
    latitude: Option<f64>,
    longitude: Option<f64>,
    // region: String,
    // country_region: Option<String>,
}

pub async fn handler(request: Request) -> Result<Response<Body>, Error> {
    dotenv::dotenv().ok();
    if request.method().as_str() == "POST" {
        let bots = isbot::Bots::default();
        let user_agent = request.headers().get("User-Agent").unwrap();
        let user_agent = user_agent.to_str().unwrap();

        if bots.is_bot(user_agent) {
            return http::bad_request(json!({
                "success": false,
                "payload": format!("Invalid submission detected."),
            }));
        };

        if let Ok(db) = get_db_client().await {
            let Geo { flag, city, country, latitude, longitude } =
                geolocation(&request);

            let Args { name, pathname, version, referrer } =
                request.payload().unwrap_or(None).unwrap_or_default();

            let _result = db
                .analytics()
                .create(
                    pathname,
                    name,
                    vec![
                        analytics::version::set(Some(version)),
                        analytics::referrer::set(Some(referrer)),
                        analytics::flag::set(flag),
                        analytics::city::set(city),
                        analytics::country::set(country),
                        analytics::latitude::set(latitude),
                        analytics::longitude::set(longitude),
                    ],
                )
                .exec()
                .await?;

            return http::ok(json!({
                "success": true,
                "payload": format!("Sent Request!"),
            }));
        } else {
            return http::bad_request(json!({
                "success": false,
                "payload": format!("Failed to initialize database"),
            }));
        }
    }
    package::method_not_allowed(json!({
        "success": false,
        "payload": format!("HTTP Method Not Allowed!"),
    }))
}

fn geolocation(request: &Request) -> Geo {
    let _region =
        get_region_from_request_id(to_str(get_header(request, "x-vercel-id")));
    let _country_region =
        to_str(get_header(request, "x-vercel-ip-country-region"));
    let city = to_str(get_header(request, "x-vercel-ip-city"));
    let country = to_str(get_header(request, "x-vercel-ip-country"));

    let latitude = to_float(get_header(request, "x-vercel-ip-latitude"));
    let longitude = to_float(get_header(request, "x-vercel-ip-longitude"));

    let flag = get_flag(to_str(get_header(request, "x-vercel-ip-country")));

    Geo { city, country, flag, latitude, longitude }
}

fn get_flag(country_code: Option<String>) -> Option<String> {
    let emoji_flag_unicode_starting_position = 127397u32;
    let code = country_code?.to_string();

    if !regex_is_match!("^[A-Z]{2}$", &code) {
        return None;
    }

    Some(
        code.chars()
            .map(|char| emoji_flag_unicode_starting_position + char as u32)
            .filter_map(char::from_u32)
            .collect(),
    )
}

fn get_region_from_request_id(request_id: Option<String>) -> String {
    if let Some(id) = request_id {
        id.split(':').take(1).collect()
    } else {
        "dev1".to_string()
    }
}

fn get_header<'a>(
    request: &'a Request,
    key: &'a str,
) -> Option<&'a HeaderValue> {
    request.headers().get(key)
}

fn to_str(header_value: Option<&HeaderValue>) -> Option<String> {
    header_value
        .and_then(|value| value.to_str().ok())
        .map(|value| value.to_string())
}

fn to_float(header_value: Option<&HeaderValue>) -> Option<f64> {
    header_value
        .and_then(|value| value.to_str().ok())
        .and_then(|value| value.parse::<f64>().ok())
}
