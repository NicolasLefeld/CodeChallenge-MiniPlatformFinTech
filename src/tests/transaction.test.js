const request = require("supertest");
const app = require("../index"); // suponiendo que exportás app

test("basic transaction test", async () => {
    const res = await request(app).get("/transactions?userId=1");
    expect(res.statusCode).toBe(200);
});