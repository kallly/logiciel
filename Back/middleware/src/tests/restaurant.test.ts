const request = require("supertest");
import { app } from "../app";

describe("Test restaurant", () => {
  test("Create user", done => {
    request(app)
      .put("/user/create")
      .set('Content-type', 'application/json')
      .send({last_name:"test",first_name:"test",password:"test",address:"test",email:"test_restaurant",phone_number:"0666666666",type:"livreur"})
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  let jwt:string = 'flag';
  let user_id:number;
  test("Great pass", done => {
    request(app)
      .post("/login")
      .set('Content-type', 'application/json')
      .send({ email: 'test_restaurant', password: 'test' })
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        jwt = JSON.parse(response.text).jwt;
        user_id = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString()).id;
        done();
      });
  });
  
   test("Create restaurant", done => {
    request(app)
      .put("/restaurant/create")
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${jwt}`)
      .send({name:'CESI_R',img:"http://img",price:1,description:"description_test",location:"location_test", type:"fastfood_test"})
      .then((response:any) => {console.log(response.text);
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test("Get restaurant", done => {
    request(app)
      .get("/restaurant")
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  let id:any;
  test("Get restaurant by params", done => {
    request(app)
      .post("/restaurant")
      .set('Content-type', 'application/json')
      .send({name:'CESI_R',user:user_id})
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        id = JSON.parse(response.text).message._id;
        done();
      });
  });
  test("Update restaurant", done => {
    request(app)
      .put(`/restaurant/update`)
      .set('Authorization', `Bearer ${jwt}`)
      .set('Content-type', 'application/json')
      .send({img:"http://img"})
      .then((response:any) => {
        expect(JSON.parse(response.text).status).toBe("success");
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test("Delete restaurant", done => {
    request(app)
      .delete(`/restaurant/delete`)
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