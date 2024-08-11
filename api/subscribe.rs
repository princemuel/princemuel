use dotenv::dotenv;
use resend_rs::{types::ContactData, Resend};
use serde::{Deserialize, Serialize};
use serde_json::json;
use vercel_runtime::{
    http, run, Body, Error, Request, RequestPayloadExt, Response,
};

#[derive(Debug, Default, Serialize, Deserialize)]
struct FormPayload {
    #[serde(default)]
    email: String,
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

pub async fn handler(request: Request) -> Result<Response<Body>, Error> {
    dotenv().ok();
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

        let resend_token = std::env::var("RESEND_TOKEN").expect(
        "Environment Variable RESEND_TOKEN not set. Please set it to your Resend API key. https://resend.com/docs/");
        let audience_id = std::env::var("RESEND_AUDIENCE")
            .expect("Environment Variable RESEND_AUDIENCE not set.");
        let resend = Resend::new(resend_token.as_str());

        // let payload = match request.payload::<Payload>() {
        //     Ok(Some(value)) => value,
        //     _ => panic!("Invalid email"),
        // };

        let args = request
            .payload::<FormPayload>()
            .unwrap_or(None)
            .unwrap_or_default();

        let contact = ContactData::new(&args.email).with_unsubscribed(false);

        resend.contacts.create(&audience_id, contact).await?;

        return http::ok(json!({
            "success": true,
            "payload": format!("Subscribed!"),
        }));
    }

    package::method_not_allowed(json!({
        "success": false,
        "payload": format!("HTTP Method Not Allowed!"),
    }))
}
