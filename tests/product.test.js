'use strict'

const { sequelize } = require("../models")
const { queryInterface } = sequelize
const request = require("supertest");
const app = require("../app.js");

let access_token;
let idParams;
let token_cust;

beforeAll((done) => {
  request(app)
  .post("/login")
  .send({ email: "dave.admin@email.com", password: "dave123" })
  .then(res => {
    access_token = res.body;
    done()
  })
})

beforeAll((done) => {
  request(app)
  .post("/products")
  .set("token", access_token)
  .send({
    name: "sepatu adidas",
    imgUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.co.id%2FSepatu-Running-Adidas-Emboss-i.201060843.7512021055&psig=AOvVaw1YVjmYhbjcEZR7N-HalnY2&ust=1605019192922000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi2ksnY9ewCFQAAAAAdAAAAABAD",
    stock: 9,
    price: 556000
  })
  .then(res => {
    idParams = res.body.id;
    done();
  })
})

beforeAll((done) => {
  request(app)
  .post("/login")
  .send({ email: "dave.user@email.com", password: "dave123" })
  .then(res => {
    token_cust = res.body;
    done()
  })
})

afterAll((done) => {
  queryInterface.bulkDelete("Products", null, {});
  done();
})

describe("test endPoint POST /products", ()=>{
  it("test add product success", (done) =>{
    request(app)
    .post("/products")
    .set("token", access_token)
    .send({
      name: "sepatu adidas",
      imgUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.co.id%2FSepatu-Running-Adidas-Emboss-i.201060843.7512021055&psig=AOvVaw1YVjmYhbjcEZR7N-HalnY2&ust=1605019192922000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi2ksnY9ewCFQAAAAAdAAAAABAD",
      stock: 9,
      price: 556000
    })
    .then(response => {
      const { body, status } = response;
      expect(status).toEqual(201);
      expect(body).toHaveProperty("id", expect.any(Number));
      expect(body).toHaveProperty("name", "sepatu adidas");
      expect(body).toHaveProperty("imgUrl", "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.co.id%2FSepatu-Running-Adidas-Emboss-i.201060843.7512021055&psig=AOvVaw1YVjmYhbjcEZR7N-HalnY2&ust=1605019192922000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi2ksnY9ewCFQAAAAAdAAAAABAD");
      expect(body).toHaveProperty("stock", 9);
      expect(body).toHaveProperty("price", 556000);
      done()
    })
    .catch(err => {
      console.log(err);
    })
  });

  it("test add product fail(with customer token)", (done) => {
    request(app)
    .post("/products")
    .set("token", token_cust)
    .send({
      name: "sepatu adidas",
      imgUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.co.id%2FSepatu-Running-Adidas-Emboss-i.201060843.7512021055&psig=AOvVaw1YVjmYhbjcEZR7N-HalnY2&ust=1605019192922000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi2ksnY9ewCFQAAAAAdAAAAABAD",
      stock: 9,
      price: 556000
    })
    .then(res => {
      const { body, status } = res;
      expect(status).toEqual(401);
      expect(body).toEqual("Authorization Failed!");
      done();
    })
    .catch(err => {
      console.log(err);
    })
  })

  it("test add product fail(without token)", (done) =>{
    request(app)
    .post("/products")
    // .set("token", access_token)
    .send({
      name: "sepatu adidas",
      imgUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.co.id%2FSepatu-Running-Adidas-Emboss-i.201060843.7512021055&psig=AOvVaw1YVjmYhbjcEZR7N-HalnY2&ust=1605019192922000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi2ksnY9ewCFQAAAAAdAAAAABAD",
      stock: 9,
      price: 556000
    })
    .then(response => {
      const { body, status } = response;
      expect(status).toEqual(401);
      expect(body).toEqual("Authentication Failed!")
      done();
    })
    .catch(err => {
      console.log(err);
    })
  });

  it("test add product fail (name product is required!)", (done) => {
    request(app)
    .post("/products")
    .set("token", access_token)
    .send({
      name: "",
      imgUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.co.id%2FSepatu-Running-Adidas-Emboss-i.201060843.7512021055&psig=AOvVaw1YVjmYhbjcEZR7N-HalnY2&ust=1605019192922000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi2ksnY9ewCFQAAAAAdAAAAABAD",
      stock: 9,
      price: 556000
    })
    .then(res => {
      const { body, status } = res;
      expect(status).toEqual(400);
      expect(body).toEqual("Product Name is required!");
      done();
    })
    .catch(err => {
      console.log(err);
    })
  })

  it("test add product fail (imgUrl is required)", (done) => {
    request(app)
    .post("/products")
    .set("token", access_token)
    .send({
      name: "Sepatu adidas",
      imgUrl: "",
      stock: 9,
      price: 556000
    })
    .then(res => {
      const { body, status } = res;
      expect(status).toEqual(400);
      expect(body).toEqual("ImgUrl is required!");
      done();
    })
    .catch(err => {
      console.log(err);
    })
  })

  it("test add product fail (price is required)", (done) => {
    request(app)
    .post("/products")
    .set("token", access_token)
    .send({
      name: "Sepatu adidas",
      imgUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.co.id%2FSepatu-Running-Adidas-Emboss-i.201060843.7512021055&psig=AOvVaw1YVjmYhbjcEZR7N-HalnY2&ust=1605019192922000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi2ksnY9ewCFQAAAAAdAAAAABAD",
      stock: 9,
      price: null
    })
    .then(res => {
      const { body, status } = res;
      expect(status).toEqual(400);
      expect(body).toEqual("Price is required!");
      done();
    })
    .catch(err => {
      console.log(err);
    })
  })

  it("test add product fail (price must be greater than 0!)", (done) => {
    request(app)
    .post("/products")
    .set("token", access_token)
    .send({
      name: "Sepatu adidas",
      imgUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.co.id%2FSepatu-Running-Adidas-Emboss-i.201060843.7512021055&psig=AOvVaw1YVjmYhbjcEZR7N-HalnY2&ust=1605019192922000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi2ksnY9ewCFQAAAAAdAAAAABAD",
      stock: 10,
      price: -10000
    })
    .then(res => {
      const { body, status } = res;
      expect(status).toEqual(400);
      expect(body).toEqual("Price must be greater than 0!");
      done();
    })
    .catch(err => {
      console.log(err);
    })
  })

  it("test add product fail (price must be in numeric!)", (done) => {
    request(app)
    .post("/products")
    .set("token", access_token)
    .send({
      name: "Sepatu adidas",
      imgUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.co.id%2FSepatu-Running-Adidas-Emboss-i.201060843.7512021055&psig=AOvVaw1YVjmYhbjcEZR7N-HalnY2&ust=1605019192922000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi2ksnY9ewCFQAAAAAdAAAAABAD",
      stock: 10,
      price: "test"
    })
    .then(res => {
      const { body, status } = res;
      expect(status).toEqual(400);
      expect(body).toEqual("Price must be in numeric!");
      done();
    })
    .catch(err => {
      console.log(err);
    })
  })

  it("test add product fail (stock is required)", (done) => {
    request(app)
    .post("/products")
    .set("token", access_token)
    .send({
      name: "Sepatu adidas",
      imgUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.co.id%2FSepatu-Running-Adidas-Emboss-i.201060843.7512021055&psig=AOvVaw1YVjmYhbjcEZR7N-HalnY2&ust=1605019192922000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi2ksnY9ewCFQAAAAAdAAAAABAD",
      stock: null,
      price: 556000
    })
    .then(res => {
      const { body, status } = res;
      expect(status).toEqual(400);
      expect(body).toEqual("Stock is required!");
      done();
    })
    .catch(err => {
      console.log(err);
    })
  })

  it("test add product fail (stock must be in numeric!)", (done) => {
    request(app)
    .post("/products")
    .set("token", access_token)
    .send({
      name: "Sepatu adidas",
      imgUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.co.id%2FSepatu-Running-Adidas-Emboss-i.201060843.7512021055&psig=AOvVaw1YVjmYhbjcEZR7N-HalnY2&ust=1605019192922000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi2ksnY9ewCFQAAAAAdAAAAABAD",
      stock: "stock",
      price: 556000
    })
    .then(res => {
      const { body, status } = res;
      expect(status).toEqual(400);
      expect(body).toEqual("Stock must be in numeric!");
      done();
    })
    .catch(err => {
      console.log(err);
    })
  })

  it("test add product fail (stock must be greater than 0!)", (done) => {
    request(app)
    .post("/products")
    .set("token", access_token)
    .send({
      name: "Sepatu adidas",
      imgUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.co.id%2FSepatu-Running-Adidas-Emboss-i.201060843.7512021055&psig=AOvVaw1YVjmYhbjcEZR7N-HalnY2&ust=1605019192922000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi2ksnY9ewCFQAAAAAdAAAAABAD",
      price: 556000,
      stock: -10
    })
    .then(res => {
      const { body, status } = res;
      expect(status).toEqual(400);
      expect(body).toEqual("Stock must be greater than 0!");
      done();
    })
    .catch(err => {
      console.log(err);
    })
  })

})

describe("test endpoint PUT /products", () => {
  it("test put products success", (done) => {
    request(app)
    .put(`/products/${idParams}`)
    .set("token", access_token)
    .send({
      name: "sepatu adidas baru",
      imgUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.co.id%2FSepatu-Running-Adidas-Emboss-i.201060843.7512021055&psig=AOvVaw1YVjmYhbjcEZR7N-HalnY2&ust=1605019192922000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi2ksnY9ewCFQAAAAAdAAAAABAD",
      stock: 11,
      price: 556000
    })
    .then(res => {
      const { body, status } = res;
      console.log(body);
      expect(status).toEqual(200);
      expect(body).toEqual([1]);
      done();
    })
    .catch(err => {
      console.log(err);
    })
  })

  it("test put product fail (with customer token)", (done) => {
    request(app)
    .put(`/products/${idParams}`)
    .set("token", token_cust)
    .send({
      name: "sepatu adidas baru",
      imgUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.co.id%2FSepatu-Running-Adidas-Emboss-i.201060843.7512021055&psig=AOvVaw1YVjmYhbjcEZR7N-HalnY2&ust=1605019192922000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi2ksnY9ewCFQAAAAAdAAAAABAD",
      stock: 11,
      price: 556000
    })
    .then(res => {
      const { body, status } = res;
      expect(status).toEqual(401);
      expect(body).toEqual("Authorization Failed!");
      done();
    })
    .catch(err => {
      console.log(err);
    })
  })

  it("test put product fail (without token)", (done) => {
    request(app)
    .put(`/products/${idParams}`)
    .send({
      name: "sepatu adidas baru",
      imgUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.co.id%2FSepatu-Running-Adidas-Emboss-i.201060843.7512021055&psig=AOvVaw1YVjmYhbjcEZR7N-HalnY2&ust=1605019192922000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi2ksnY9ewCFQAAAAAdAAAAABAD",
      stock: 11,
      price: 556000
    })
    .then(res => {
      const { body, status } = res;
      expect(status).toEqual(401);
      expect(body).toEqual("Authentication Failed!")
      done();
    })
    .catch(err => {
      console.log(err);
    })
  })

  it("test put product fail (product name is required!)", (done) => {
    request(app)
    .put(`/products/${idParams}`)
    .set("token", access_token)
    .send({
      name: "",
      imgUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.co.id%2FSepatu-Running-Adidas-Emboss-i.201060843.7512021055&psig=AOvVaw1YVjmYhbjcEZR7N-HalnY2&ust=1605019192922000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi2ksnY9ewCFQAAAAAdAAAAABAD",
      stock: 11,
      price: 556000
    })
    .then(res => {
      const { body, status } = res;
      expect(status).toEqual(400);
      expect(body).toEqual("Product Name is required!");
      done();
    })
    .catch(err => {
      console.log(err);
    })
  })

  it("test put product fail (imgUrl is required!)", (done) => {
    request(app)
    .put(`/products/${idParams}`)
    .set("token", access_token)
    .send({
      name: "sepatu adidas 2",
      imgUrl: "",
      stock: 11,
      price: 556000
    })
    .then(res => {
      const { body, status } = res;
      expect(status).toEqual(400);
      expect(body).toEqual("ImgUrl is required!");
      done();
    })
    .catch(err => {
      console.log(err);
    })
  })

  it("test put product fail (price is required!)", (done) => {
    request(app)
    .put(`/products/${idParams}`)
    .set("token", access_token)
    .send({
      name: "sepatu adidas 2",
      imgUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.co.id%2FSepatu-Running-Adidas-Emboss-i.201060843.7512021055&psig=AOvVaw1YVjmYhbjcEZR7N-HalnY2&ust=1605019192922000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi2ksnY9ewCFQAAAAAdAAAAABAD",
      stock: 11,
      price: null
    })
    .then(res => {
      const { body, status } = res;
      expect(status).toEqual(400);
      expect(body).toEqual("Price is required!");
      done();
    })
    .catch(err => {
      console.log(err);
    })
  })

  it("test put product fail (price must be greater than 0!)", (done) => {
    request(app)
    .put(`/products/${idParams}`)
    .set("token", access_token)
    .send({
      name: "sepatu adidas 2",
      imgUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.co.id%2FSepatu-Running-Adidas-Emboss-i.201060843.7512021055&psig=AOvVaw1YVjmYhbjcEZR7N-HalnY2&ust=1605019192922000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi2ksnY9ewCFQAAAAAdAAAAABAD",
      stock: 11,
      price: -10
    })
    .then(res => {
      const { body, status } = res;
      expect(status).toEqual(400);
      expect(body).toEqual("Price must be greater than 0!");
      done();
    })
    .catch(err => {
      console.log(err);
    })
  })

  it("test put product fail (price must be in numeric!)", (done) => {
    request(app)
    .put(`/products/${idParams}`)
    .set("token", access_token)
    .send({
      name: "sepatu adidas 2",
      imgUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.co.id%2FSepatu-Running-Adidas-Emboss-i.201060843.7512021055&psig=AOvVaw1YVjmYhbjcEZR7N-HalnY2&ust=1605019192922000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi2ksnY9ewCFQAAAAAdAAAAABAD",
      stock: 11,
      price: "price"
    })
    .then(res => {
      const { body, status } = res;
      expect(status).toEqual(400);
      expect(body).toEqual("Price must be in numeric!");
      done();
    })
    .catch(err => {
      console.log(err);
    })
  })

  it("test put product fail (stock is required)", (done) => {
    request(app)
    .put(`/products/${idParams}`)
    .set("token", access_token)
    .send({
      name: "sepatu adidas 2",
      imgUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.co.id%2FSepatu-Running-Adidas-Emboss-i.201060843.7512021055&psig=AOvVaw1YVjmYhbjcEZR7N-HalnY2&ust=1605019192922000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi2ksnY9ewCFQAAAAAdAAAAABAD",
      stock: null,
      price: 560700
    })
    .then(res => {
      const { body, status } = res;
      expect(status).toEqual(400);
      expect(body).toEqual("Stock is required!");
      done();
    })
    .catch(err => {
      console.log(err);
    })
  })

  it("test put product fail (stock must be in numeric!)", (done) => {
    request(app)
    .put(`/products/${idParams}`)
    .set("token", access_token)
    .send({
      name: "sepatu adidas 2",
      imgUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.co.id%2FSepatu-Running-Adidas-Emboss-i.201060843.7512021055&psig=AOvVaw1YVjmYhbjcEZR7N-HalnY2&ust=1605019192922000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi2ksnY9ewCFQAAAAAdAAAAABAD",
      stock: "stock",
      price: 560700
    })
    .then(res => {
      const { body, status } = res;
      expect(status).toEqual(400);
      expect(body).toEqual("Stock must be in numeric!");
      done();
    })
    .catch(err => {
      console.log(err);
    })
  })

  it("test put product fail (stock must be greater than 0!)", (done) => {
    request(app)
    .put(`/products/${idParams}`)
    .set("token", access_token)
    .send({
      name: "sepatu adidas 2",
      imgUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.co.id%2FSepatu-Running-Adidas-Emboss-i.201060843.7512021055&psig=AOvVaw1YVjmYhbjcEZR7N-HalnY2&ust=1605019192922000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi2ksnY9ewCFQAAAAAdAAAAABAD",
      stock: -9,
      price: 560700
    })
    .then(res => {
      const { body, status } = res;
      expect(status).toEqual(400);
      expect(body).toEqual("Stock must be greater than 0!");
      done();
    })
    .catch(err => {
      console.log(err);
    })
  })
})

describe("test endpoint DELETE /products", ()=>{  
  it("test Delete product success", (done)=>{
    request(app)
    .delete(`/products/${idParams}`)
    .set("token", access_token)
    .then(res => {
      const { body, status } = res;
      expect(status).toEqual(200);
      expect(body).toEqual(1);
      done();
    })
    .catch(err => {
      console.log(err);
    })
  })

  it("test delete product fail (with customer token)", (done) => {
    request(app)
    .delete(`/products/${idParams}`)
    .set("token", token_cust)
    .then(res => {
      const { body, status } = res;
      expect(status).toEqual(401);
      expect(body).toEqual("Authorization Failed!");
      done();
    })
    .catch(err => {
      console.log(err);
    })
  })

  it("test delete product fail (without token)", (done) => {
    request(app)
    .delete(`/products/${idParams}`)
    .then(res => {
      const { body, status } = res;
      expect(status).toEqual(401);
      expect(body).toEqual("Authentication Failed!");
      done();
    })
    .catch(err => {
      console.log(err);
    })
  })
})