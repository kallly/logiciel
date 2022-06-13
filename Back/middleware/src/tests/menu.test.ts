const request = require("supertest");
import { app } from "../app";

describe("Test user", () => {
  let jwt:string;
  test("Great pass", done => {
    request(app)
      .post("/login")
      .set('Content-type', 'application/json')
      .send({ email: 'test', password: 'test' })
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        jwt = JSON.parse(response.text).jwt;
        done();
      });
  });
  /*test("Create menu", done => {
    request(app)
      .put("/menu/create")
      .set('Content-type', 'application/json')
      .set('Cookie', [`jwt=${jwt}`])
      .send({ last_name: 'test2' })
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        jwt = JSON.parse(response.text).jwt;
        done();
      });
  });*/
  test("Get menu", done => {
    request(app)
      .get("/menu")
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  /*test("Delete menu", done => {
    request(app)
      .delete("/user")
      .set('Cookie', [`jwt=${jwt}`])
      .then((response:any) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.text).status).toBe('success');
        done();
      });
  });*/
});