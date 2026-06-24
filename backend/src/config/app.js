export const appConfig = {
  port: Number(process.env.PORT || process.env.BACKEND_PORT || 4000),
  host: process.env.HOST || '127.0.0.1',
};
