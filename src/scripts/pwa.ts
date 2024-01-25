import { registerSW } from "virtual:pwa-register";

registerSW({
  immediate: true,
  onRegisteredSW(swScriptUrl) {
    console.log("[Vite Plugin PWA] SW registered: ", swScriptUrl);
  },
  onOfflineReady() {
    console.log("[Vite Plugin PWA] PWA application ready to work offline");
  },
});
