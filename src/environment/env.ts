export const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://lite-scheduler.herokuapp.com"
    : "http://localhost:8555";
