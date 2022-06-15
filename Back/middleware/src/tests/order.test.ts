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
  test("Create order", done => {
    request(app)
      .put("/order/create")
      .set('Content-type', 'application/json')
      .set('Cookie', [`jwt=${jwt}`])
      .send({user:'1', restaurant:'629e33b5ce218b10d2d7a257',products:['62a8a369cd940332e4529d4e']})
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test("Get order", done => {
    request(app)
      .get("/order")
      .set('Cookie', [`jwt=${jwt}`])
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  /*let id:any;
  test("Get order by params", done => {
    request(app)
      .post("/order")
      .set('Content-type', 'application/json')
      .send({restaurant:'CESI_R',name:"1",text:"2"})
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        id = JSON.parse(response.text).message._id;
        done();
      });
  });
  test("Update order", done => {
    request(app)
      .put(`/order/update/${id}`)
      .set('Cookie', [`jwt=${jwt}`])
      .set('Content-type', 'application/json')
      .send({restaurant:'CESI_R',name:"flag",text:"2"})
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test("Delete order", done => {
    request(app)
      .delete(`/order/delete/${id}`)
      .set('Cookie', [`jwt=${jwt}`])
      .then((response:any) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.text).status).toBe('success');
        done();
      });
  });*/
});