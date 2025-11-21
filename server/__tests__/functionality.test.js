import request from "supertest";
import app from "../app";
import mongoose from "mongoose";


describe("Url routes", () => {
  let token;
  let shortUrlId;
  beforeAll(async () => {
    const data = {
      email: `rushi54013@gmail.com`,
      password: "123456",
    };
    const response = await request(app).post("/api/users/signin").send(data);
    token = response.body.token;
  });

  it("should throw error if token not found ",async()=>{
    const response = await request(app)
      .get("/api/url")
      
    //console.log(response.body);
    expect(response.status).toEqual(401);
  })
  it("should return the list of all urls of the user", async () => {
    const response = await request(app)
      .get("/api/url")
      .set("Authorization", `Bearer ${token}`);
    // console.log(response.body); TODO
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("urls");
  });

  it("should generate a new short url",async()=>{
    const random = Math.round(Math.random()*1000);
    const response = await request(app).post("/api/url").send({
        url:`https://google${random}.com`,
        title:""
    }).set("Authorization",`Bearer ${token}`)
   
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("shortUrl");
  })

  it("should not allow the user to generate short url for the same url",async()=>{
    const url = "https://google.com";
    const response = await request(app).post("/api/url").send({
        url,
        title:""
    }).set("Authorization",`Bearer ${token}`)
    expect(response.status).toBe(400);
  })

  // it("should allow the user to delete a url",async()=>{
  //   const response = await request(app).delete("/api/url").send({
  //       url:`https://google${random}.com`,
  //   }).set("Authorization",`Bearer ${token}`)
  //   expect(response.status).toBe(201);
  //   expect(response.body).toHaveProperty("shortUrl");
  // })
});


describe("QR routes", () => {
    let token;
    beforeAll(async () => {
      const data = {
        email: `rushi54013@gmail.com`,
        password: "123456",
      };
      const response = await request(app).post("/api/users/signin").send(data);
      token = response.body.token;
    });
  
    it("should throw error if token not found ",async()=>{
      const response = await request(app)
        .get("/api/url")
        
      //console.log(response.body);
      expect(response.status).toEqual(401);
    })
    it("should return the list of all QR codes of the user", async () => {
      const response = await request(app)
        .get("/api/qr")
        .set("Authorization", `Bearer ${token}`);
      // console.log(response.body); TODO
      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty("qrs");
    });
  
    it("should generate a new qr code",async()=>{
      const random = Math.round(Math.random()*1000);
      const response = await request(app).post("/api/qr").send({
          url:`https://google${random}.com`,
         
      }).set("Authorization",`Bearer ${token}`)
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("data");
  
    })
  
    it("should not allow the user to generate qr code for the same url",async()=>{
      const url = "https://google.com";
      const response = await request(app).post("/api/qr").send({
          url,
          title:""
      }).set("Authorization",`Bearer ${token}`)
      expect(response.status).toBe(400);
    })
  
  });
afterAll(async () => {
  // close DB or clean up
  await mongoose.connection.close();
});
