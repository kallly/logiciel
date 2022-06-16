const request = require("supertest");
import { app } from "../app";

describe("Test the root path", () => {
  test("Great pass", done => {
    request(app)
      .post("/login")
      .set('Content-type', 'application/json')
      .send({ email: 'test', password: 'test' })
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test("Bad pass", done => {
    request(app)
      .post("/login")
      .set('Content-type', 'application/json')
      .send({ email: 'test', password: 'BAD_PASSWORD' })
      .then((response:any) => {
        expect(response.statusCode).toBe(403);
        expect(JSON.parse(response.text).status).toBe('failed');
        done();
      });
  });
  test("Missing Params", done => {
    request(app)
      .post("/login")
      .set('Content-type', 'application/json')
      .send({ email: 'test' })
      .then((response:any) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.text).status).toBe("error");
        done();
      });
  });
});