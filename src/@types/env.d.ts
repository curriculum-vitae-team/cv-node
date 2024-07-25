declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    DATABASE_URL: string;
    DATABASE_SSL?: string;
    JWT_SECRET: string;
    JWT_SECRET_2: string;
    CLOUDINARY_URL: string;
    MAIL_FROM: string;
    SMTP_URL: string;
    CHROME_WS: string;
    SENTRY_DSN_URL?: string;
  }
}
