import { registerSW } from "virtual:pwa-register";

const intervalMS = 60 * 60 * 1000;

registerSW({
  immediate: true,
  onRegisteredSW(url, r) {
    console.log(`[Vite Plugin PWA] SW registered: ${url}`);
    r &&
      setInterval(async () => {
        if (!(!r.installing && navigator)) return;
        if ("connection" in navigator && !navigator.onLine) return;

        const response = await fetch(url, {
          cache: "no-store",
          headers: { Cache: "no-store", "Cache-Control": "no-cache" },
        });

        if (response?.status === 200) await r.update();
      }, intervalMS);
  },
  onOfflineReady() {
    console.log("[Vite Plugin PWA] PWA application ready to work offline");
  },
});
