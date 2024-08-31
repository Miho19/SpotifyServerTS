import request from "supertest";
import app from "../index";

const server = request(app);

describe("Basic Server Testing", () => {
  test("Invalid Route", () => {
    return server.get("/hello").expect(404);
  });
});
