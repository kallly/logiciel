const request = require("supertest");
import { app } from "../app";

describe("Test user", () => {
  test("Create user failed", done => {
    request(app)
      .put("/user/create")
      .set('Content-type', 'application/json')
      .send({last_name:"test",first_name:"test",password:"test",address:"test",email:"test",phone_number:"0666666666",type:"livreur"})
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("error");
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test("Create user", done => {
    request(app)
      .put("/user/create")
      .set('Content-type', 'application/json')
      .send({last_name:"test",first_name:"test",password:"test",address:"test",email:"test_livreur",phone_number:"0666666666",type:"livreur"})
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
      .send({ email: 'test_livreur', password: 'BAD_PASSWORD' })
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("failed");
        expect(response.statusCode).toBe(200);
        jwt = JSON.parse(response.text).jwt;
        done();
      });
  });
  let jwt:string;
  test("Great pass", done => {
    request(app)
      .post("/login")
      .set('Content-type', 'application/json')
      .send({ email: 'test_livreur', password: 'test' })
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        jwt = JSON.parse(response.text).jwt;
        done();
      });
  });
  test("Update user", done => {
    request(app)
      .put("/user/update")
      .set('Content-type', 'application/json')
      .set('Cookie', [`jwt=${jwt}`])
      .send({ last_name: 'test2' })
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        jwt = JSON.parse(response.text).jwt;
        done();
      });
  });
  test("Update user but jwt need change", done => {
    request(app)
      .put("/user/update")
      .set('Content-type', 'application/json')
      .set('Cookie', [`jwt=${jwt}`])
      .send({ last_name: 'test' })
      .then((response:any) => {
        //expect(JSON.parse(response.text).status).toBe("failed");
        expect(response.statusCode).toBe(200);
        jwt = JSON.parse(response.text).jwt;
        done();
      });
  });
  test("Great pass", done => {
    request(app)
      .post("/login")
      .set('Content-type', 'application/json')
      .send({ email: 'test_livreur', password: 'test' })
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        jwt = JSON.parse(response.text).jwt;
        done();
      });
  });
  test("Delete user", done => {
    request(app)
      .delete("/user")
      .set('Cookie', [`jwt=${jwt}`])
      .then((response:any) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.text).status).toBe('success');
        done();
      });
  });
});