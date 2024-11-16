import { registerSW } from "virtual:pwa-register";
import { getElement } from "@/helpers/dom";

const period = 1.5 * 24 * 60 * 60 * 1000; // check for updates every day

window.addEventListener("load", () => {
  let swActivated = false;

  const pwaToast = getElement("#pwa-toast", HTMLDivElement);
  const pwaToastMessage = getElement(".message #toast-message", HTMLDivElement);
  const pwaCloseBtn = getElement("#pwa-close", HTMLButtonElement);
  const pwaRefreshBtn = getElement("#pwa-refresh", HTMLButtonElement);

  let refreshSW: ((reloadPage?: boolean) => Promise<void>) | undefined;

  const refreshCallback = () => refreshSW?.(true);

  const hidePwaToast = (raf = false) => {
    if (raf) {
      requestAnimationFrame(() => hidePwaToast(false));
      return;
    }
    if (pwaToast.classList.contains("refresh"))
      pwaRefreshBtn.removeEventListener("click", refreshCallback);

    pwaToast.classList.remove("show", "refresh");
  };

  const showPwaToast = (offline: boolean) => {
    if (!offline) pwaRefreshBtn.addEventListener("click", refreshCallback);
    requestAnimationFrame(() => {
      hidePwaToast(false);
      if (!offline) pwaToast.classList.add("refresh");
      pwaToast.classList.add("show");
    });
  };

  pwaCloseBtn.addEventListener("click", () => hidePwaToast(true));

  registerSW({
    immediate: true,
    onOfflineReady() {
      pwaToastMessage.innerHTML = "[Vite Plugin PWA] PWA application ready to work offline";
      showPwaToast(true);
    },
    onNeedRefresh() {
      pwaToastMessage.innerHTML = "[Vite Plugin PWA] PWA application needs an update";
      showPwaToast(false);
    },
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return;
      if (r?.active?.state === "activated") {
        swActivated = true;
        sync(period, swUrl, r);
        console.info(`[Vite Plugin PWA] SW registered: ${swUrl} after activation`);
      } else if (r?.installing) {
        r.installing.addEventListener("statechange", (e) => {
          const sw = e.target as ServiceWorker;
          swActivated = sw.state === "activated";
          if (swActivated) sync(period, swUrl, r);
          console.info(`[Vite Plugin PWA] SW registered: ${swUrl} after installing`);
        });
      }
    },
  });
});

/**
 * This `sync` function will check for updates
 * according to the period interval specified
 */
function sync(period: number, url: string, r: ServiceWorkerRegistration) {
  if (period <= 0) return;

  setInterval(async () => {
    if ("onLine" in navigator && !navigator.onLine) return;

    const response = await fetch(url, {
      cache: "no-store",
      headers: { cache: "no-store", "cache-control": "no-cache" },
    });
    if (response?.status === 200) await r.update();
  }, period);
}
