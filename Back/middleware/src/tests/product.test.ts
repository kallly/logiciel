const request = require("supertest");
import { app } from "../app";

describe("Test product", () => {
  test("Create user", done => {
    request(app)
      .put("/user/create")
      .set('Content-type', 'application/json')
      .send({last_name:"test",first_name:"test",password:"test",address:"test",email:"test_product",phone_number:"0666666666",type:"livreur"})
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  let jwt:string;
  test("Great pass", done => {
    request(app)
      .post("/login")
      .set('Content-type', 'application/json')
      .send({ email: 'test_product', password: 'test' })
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        jwt = JSON.parse(response.text).jwt;
        done();
      });
  });
  test("Create product", done => {
    request(app)
      .put("/product/create")
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${jwt}`)
      .send({restaurant:'CESI_R',name:"1",text:"2",price:1})
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test("Get product", done => {
    request(app)
      .get("/product")
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  let id:any;
  test("Get product by params", done => {
    request(app)
      .post("/product")
      .set('Content-type', 'application/json')
      .send({restaurant:'CESI_R',name:"1",text:"2",price:1})
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        id = JSON.parse(response.text).message._id;
        done();
      });
  });
  test("Update product", done => {
    request(app)
      .put(`/product/update/${id}`)
      .set('Authorization', `Bearer ${jwt}`)
      .set('Content-type', 'application/json')
      .send({restaurant:'CESI_R',name:"flag",text:"2"})
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test("Delete product", done => {
    request(app)
      .delete(`/product/delete/${id}`)
      .set('Authorization', `Bearer ${jwt}`)
      .then((response:any) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.text).status).toBe('success');
        done();
      });
  });
  test("Delete user", done => {
    request(app)
      .delete("/user")
      .set('Authorization', `Bearer ${jwt}`)
      .then((response:any) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.text).status).toBe('success');
        done();
      });
  });
});