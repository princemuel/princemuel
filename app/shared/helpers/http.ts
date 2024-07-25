export const getOrigin = (req: Request) => {
  let origin;
  if (typeof window !== "undefined") {
    origin = window.location.origin;
  }
  if (req) {
    let hostURL = req.headers.get("host");
    if (hostURL) {
      hostURL = hostURL.replace("http://", "").replace("https://", "");
      if (hostURL.includes("localhost:") || hostURL.includes("127.0.0.1")) {
        origin = `http://${hostURL}`;
      } else {
        origin = `https://${hostURL}`;
      }
    }
  }
  return origin;
};

// sarah maas
// https://imagekit.io/dashboard/developer/api-keys
// BroadcastChannel
