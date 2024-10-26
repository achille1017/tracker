const env = process.env.REACT_APP_ENVIRONMENT;
const SERVER_NAME = env === "dev" ? "http://192.168.1.67:4000" : "https://withar.co"
export { SERVER_NAME }