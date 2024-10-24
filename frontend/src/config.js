const env = process.env.REACT_APP_ENVIRONMENT;
const SERVER_NAME = env === "dev" ? "http://localhost:4000" : "https://withar.co"
export { SERVER_NAME }