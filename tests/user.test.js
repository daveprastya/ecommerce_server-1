'use strict'

const request = require("supertest");
const app = require("../app.js");

describe("test endpoint POST /login", () => {
  it("test login success", (done) => {
    request(app)
    .post("/login")
    .send( { email: "dave.admin@email.com", password: "dave123" } )
    .then(response => {
      const { body, status } = response;

      expect(status).toEqual(200);
      // expect(body).toHaveProperty("body", expect.any(String));
      expect(body).toEqual(expect.any(String));
      done();
    })
    .catch(err =>{
      console.log(err);
    })
  });

  it("test login fail (Wrong Email/Password)", (done) => {
    request(app)
    .post("/login")
    .send( { email: "dave21.admin@email.com", password: "123456789" } )
    .then(response => {
      const { body, status } = response;
      expect(status).toEqual(401);
      expect(body).toEqual("Wrong Email / Password!");
      done();
    })
    .catch(err => {
      console.log(err);
    })
  })
})