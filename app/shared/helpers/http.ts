export const getOrigin = (request: Request) => {
  let origin = "";
  if (typeof window !== "undefined") origin = window.location.origin;

  if (request) {
    let host_url = request.headers.get("host");
    if (host_url) {
      host_url = host_url.replace("http://", "").replace("https://", "");
      if (host_url.includes("localhost:") || host_url.includes("127.0.0.1")) {
        origin = `http://${host_url}`;
      } else {
        origin = `https://${host_url}`;
      }
    }
  }
  return origin;
};

// sarah maas
// https://imagekit.io/dashboard/developer/api-keys
// BroadcastChannel
