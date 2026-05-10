declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

const appendScript = (src: string, id: string, inline?: string) => {
  if (document.getElementById(id)) return;

  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  if (src) {
    script.src = src;
  }
  if (inline) {
    script.text = inline;
  }
  document.head.appendChild(script);
};

export const initAnalytics = () => {
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const gtmId = import.meta.env.VITE_GTM_ID;
  const clarityId = import.meta.env.VITE_CLARITY_PROJECT_ID;

  if (gaId) {
    appendScript(`https://www.googletagmanager.com/gtag/js?id=${gaId}`, 'ga4-script');
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', gaId, { send_page_view: false });
  }

  if (gtmId) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    appendScript(`https://www.googletagmanager.com/gtm.js?id=${gtmId}`, 'gtm-script');
  }

  if (clarityId) {
    appendScript(
      '',
      'clarity-script',
      `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${clarityId}");`
    );
  }
};

export const trackEvent = (eventName: string, params: Record<string, unknown> = {}) => {
  window.gtag?.('event', eventName, params);
  window.dataLayer?.push({ event: eventName, ...params });

  try {
    const events = JSON.parse(localStorage.getItem('conversion_events') || '[]');
    events.push({
      eventName,
      params,
      path: window.location.pathname,
      timestamp: new Date().toISOString(),
    });
    if (events.length > 500) events.shift();
    localStorage.setItem('conversion_events', JSON.stringify(events));
  } catch {
    // Analytics storage is non-critical.
  }
};

