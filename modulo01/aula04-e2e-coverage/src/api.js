const http = require("http");

const PORT = 3000;

const routes = {
  "/contact:get": (request, response) => {
    response.write("contact us page");
    return response.end();
  },
  default(request, response) {
    response.writeHead(404);
    return response.end("not found!");
  },
};

console.log(routes);

const app = http
  .createServer((request, response) => {
    const { url, method } = request;
    const routeKey = `${url}:${method.toLocaleLowerCase()}`;
    const chosen = routes[routeKey] || routes["default"];
    return chosen(request, response);
  })
  .listen(PORT, () => console.log(`running on port ${PORT}`));
