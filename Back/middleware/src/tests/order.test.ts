const request = require("supertest");
import { app } from "../app";

describe("Test order", () => {
  test("Create user", done => {
    request(app)
      .put("/user/create")
      .set('Content-type', 'application/json')
      .send({last_name:"test",first_name:"test",password:"test",address:"test",email:"test_order",phone_number:"0666666666",type:"livreur"})
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
      .send({ email: 'test_order', password: 'test' })
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
      .set('Authorization', `Bearer ${jwt}`)
      .send({user:'1', restaurant:'629e33b5ce218b10d2d7a257',products:['62a8a369cd940332e4529d4e','62a8a369cd940332e4529d4e']})
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test("Get order", done => {
    request(app)
      .get("/order")
      .set('Authorization', `Bearer ${jwt}`)
      .then((response:any) => {console.log(JSON.parse(response.text).message);
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  let id:any;
  test("Get order by params", done => {
    request(app)
      .post("/order")
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${jwt}`)
      .send({user:1,restaurant:'629e33b5ce218b10d2d7a257'})
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        id = JSON.parse(response.text).message._id;
        done();
      });
  });/*
  test("Update order", done => {
    request(app)
      .put(`/order/update/${id}`)
      .set('Authorization', `Bearer ${jwt}`)
      .set('Content-type', 'application/json')
      .send({restaurant:'CESI_R',name:"flag",text:"2"})
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        done();
      });
  });*/
  test("Delete order", done => {
    request(app)
      .delete(`/order/${id}`)
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