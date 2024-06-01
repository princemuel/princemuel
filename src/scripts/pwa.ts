import { getElement } from "@/helpers";
import { registerSW } from "virtual:pwa-register";

const toast = getElement('[data-id="pwa-toast"]', HTMLElement);
const message = getElement(
  '[data-id="pwa-message"]',
  HTMLParagraphElement,
  toast,
);
const closeBtn = getElement('[data-id="pwa-close"]', HTMLButtonElement, toast);
const refreshBtn = getElement(
  '[data-id="pwa-refresh"]',
  HTMLButtonElement,
  toast,
);

let refreshSW: (reloadPage?: boolean) => Promise<void> | undefined;

const refreshCallback = () => refreshSW?.(true);

function hidePwaToast(raf: boolean) {
  if (raf) {
    window.requestAnimationFrame(() => hidePwaToast(false));
    return;
  }

  if (toast.dataset.state?.includes("refresh"))
    refreshBtn.removeEventListener("click", refreshCallback);

  toast.dataset.state = "";
}

function showPwaToast(offline: boolean) {
  if (!offline) refreshBtn.addEventListener("click", refreshCallback);
  window.requestAnimationFrame(() => {
    hidePwaToast(false);
    if (!offline) toast.dataset.state?.concat(" ", "refresh");
    toast.dataset.state?.concat(" ", "open");
  });
}

let swActivated = false;

const period = 60 * 60 * 1000; // check for updates every hour

window.addEventListener("load", () => {
  closeBtn.addEventListener("click", () => hidePwaToast(true));

  refreshSW = registerSW({
    immediate: true,
    onOfflineReady() {
      console.log("[Vite Plugin PWA] PWA application ready to work offline");
      message.innerHTML = "App ready to work offline";
      showPwaToast(true);
    },
    onNeedRefresh() {
      console.log("[Vite Plugin PWA] PWA application needs an update");
      message.innerHTML =
        "New content available, click on reload button to update";
      showPwaToast(false);
    },
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return;
      if (r?.active?.state === "activated") {
        swActivated = true;
        sync(period, swUrl, r);
        console.log(
          `[Vite Plugin PWA] SW registered: ${swUrl} after activation`,
        );
      } else if (r?.installing) {
        r.installing.addEventListener("statechange", (e) => {
          const sw = e.target as ServiceWorker;
          swActivated = sw.state === "activated";
          if (swActivated) sync(period, swUrl, r);
          console.log(
            `[Vite Plugin PWA] SW registered: ${swUrl} after installing`,
          );
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
      headers: { Cache: "no-store", "Cache-Control": "no-cache" },
    });
    if (response?.status === 200) await r.update();
  }, period);
}
