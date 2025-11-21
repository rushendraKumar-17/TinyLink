import app from "../app.js";
import request from "supertest";
import mongoose from "mongoose";

test("placeholder", () => {
  const a = 1;
  expect(a).toBe(1);
});
describe("POST /signup", () => {
  it("should allow the user to signup", async () => {
    const randomNumber = Math.round(Math.random() * 10000000);
    const data = {
      uname: "Rushendra",
      email: `rushi${randomNumber}@gmail.com`,
      password: "123456",
    };
    const response = await request(app).post("/api/users/signup").send(data);
    //console.log(response.statusCode);
    expect(response.status).toBe(201);
  });

  it("should not allow the same user to register again", async () => {
    const data = {
      uname: "Rushendra",
      email: `rushi6390125@gmail.com`,
      password: "123456",
    };
    const response = await request(app).post("/api/users/signup").send(data);
    //console.log(response.statusCode);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "User already exists");
  });

  it("should allow the user to register only if all credentials are provided", async () => {
    const randomNumber = Math.round(Math.random() * 10000000);
    const data = {
      uname: "Rushendra",
      email: `rushi${randomNumber}@gmail.com`,
    };
    const response = await request(app).post("/api/users/signup").send(data);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "All fields are mandatory");
  });
});

describe("POST /signin", () => {
  it("should return a token on successful login", async () => {
    const data = {
      email: `rushi54013@gmail.com`,
      password: "123456",
    };
    const response = await request(app).post("/api/users/signin").send(data);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should indicate non-existing user in case if he/she is not registered", async () => {
    const data = {
      email: "rushenajsldfkjalsdfjllksdf@gmail.com",
      password: "1234",
    };
    const response = await request(app).post("/api/users/signin").send(data);
    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty(
      "message",
      "Please create an account first before signing in"
    );
  });

  it("should indicate that all fields are mandatory", async () => {
    const data = {
      email: "rushenajsldfkjalsdfjllksdf@gmail.com",
    };
    const response = await request(app).post("/api/users/signin").send(data);
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty(
      "message",
      "Please provide the all the credentials"
    );
  });

  it("should indicate if credentials are invalid", async () => {
    const data = {
      email: "rushi6390125@gmail.com",
      password: "any",
    };
    const response = await request(app).post("/api/users/signin").send(data);
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("message", "Invalid credentials");
  });
});

afterAll(async () => {
  // close DB or clean up
  await mongoose.connection.close();
});
