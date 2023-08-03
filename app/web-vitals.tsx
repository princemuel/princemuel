'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    const body = JSON.stringify(metric);
    const url = `/analytics`;

    // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
    if (navigator?.sendBeacon) {
      navigator.sendBeacon(url, body);
    } else {
      fetch(url, { body, method: 'POST', keepalive: true });
    }
  });

  return <span />;
}

// const url = `${process.env.SITE_URL}/analytics`;
