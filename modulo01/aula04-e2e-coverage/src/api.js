const http = require("http");
const { once } = require("events");

const PORT = 3000;

const DEFAULT_USER = { username: "matheus", password: "admin" };

const routes = {
  "/contact:get": (request, response) => {
    response.write("contact us page");
    return response.end();
  },
  "/login:post": async (request, response) => {
    const user = JSON.parse(await once(request, "data"));
    const toLower = (text) => text.toLocaleLowerCase();
    if (
      toLower(user.username) !== toLower(DEFAULT_USER.username) ||
      user.password !== DEFAULT_USER.password
    ) {
      response.writeHead(401);
      response.end("invalid user or password");
      return;
    }

    return response.end("login succeeded");
  },
  default(request, response) {
    response.writeHead(404);
    return response.end("not found");
  },
};

const app = http
  .createServer((request, response) => {
    const { url, method } = request;
    const routeKey = `${url}:${method.toLocaleLowerCase()}`;
    const chosen = routes[routeKey] || routes["default"];
    return chosen(request, response);
  })
  .listen(PORT, () => console.log(`running on port ${PORT}`));

module.exports = app;
