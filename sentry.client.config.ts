// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
    tracesSampleRate: 1.0,

    // Replay is a client-side feature, so it goes here.
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    integrations: [
       Sentry.replayIntegration(),
       // Example: Adding the Feedback integration widget
       Sentry.feedbackIntegration({
      colorScheme: "system",
    }),
    ],
  });
}