// Simple analytics wrapper - can be extended with GA4, Plausible, etc.

export const analytics = {
  track: (event: string, properties?: Record<string, any>) => {
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
      console.log("Analytics:", event, properties);
      // TODO: Implement actual analytics tracking
      // Example: gtag('event', event, properties);
    }
  },

  page: (pageName: string) => {
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
      console.log("Page view:", pageName);
      // TODO: Implement actual page tracking
    }
  },
};

export const trackEvent = analytics.track;
export const trackPage = analytics.page;

