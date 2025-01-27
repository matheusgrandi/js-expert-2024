const { describe, it, before, after } = require("mocha");

const supertest = require("supertest");
const assert = require("assert");

describe("API Suite test", () => {
  let app;
  before((done) => {
    app = require("./api");
    app.once("listening", done);
  });
  after((done) => app.close(done));
  describe("/contact:get", () => {
    it("should request the contact route and return http status 200", async () => {
      const response = await supertest(app).get("/contact").expect(200);

      assert.strictEqual(response.text, "contact us page");
    });
  });
  describe("/login:post", () => {
    it("should request the login page and return http status 200", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({ username: "matheus", password: "admin" })
        .expect(200);

      assert.strictEqual(response.text, "login succeeded");
    });
    it("should request the login page and return http status 401", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({ username: "matheuss", password: "admin" })
        .expect(401);

      assert.strictEqual(response.text, "invalid user or password");
    });
  });
  describe("/invalid:get - 404", () => {
    it("should request and invalid page and return http status 404", async () => {
      const response = await supertest(app).get("/invalid").expect(404);

      assert.strictEqual(response.text, "not found");
    });
  });
});
