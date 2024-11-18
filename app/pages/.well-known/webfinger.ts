import { handler } from "@/helpers/api-handler";

export const GET = handler(async () => {
  return Response.json({
    subject: "acct:princemuel@mastodon.social",
    aliases: [
      "https://mastodon.social/@princemuel",
      "https://mastodon.social/users/princemuel",
    ],
    links: [
      {
        rel: "http://webfinger.net/rel/profile-page",
        type: "text/html",
        href: "https://mastodon.social/@princemuel",
      },
      {
        rel: "self",
        type: "application/activity+json",
        href: "https://mastodon.social/users/princemuel",
      },
      {
        rel: "http://ostatus.org/schema/1.0/subscribe",
        template: "https://mastodon.social/authorize_interaction?uri={uri}",
      },
    ],
  });
});
