import { init } from "@sentry/nestjs";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

init({
  dsn: process.env.SENTRY_DSN_URL,
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});
