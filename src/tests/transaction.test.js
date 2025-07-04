const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../db/connection");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

beforeAll(async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate([
        { id: 1, name: "User A", email: "a@test.com", balance: 100000 },
        { id: 2, name: "User B", email: "b@test.com", balance: 50000 },
    ]);

    await Transaction.create({
        origin: 1,
        destination: 2,
        amount: 1000,
        status: "confirmed",
        date: new Date(),
    });
});

afterAll(async () => {
    await sequelize.close();
});

test("GET /transactions returns user transactions", async () => {
    const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET);

    const res = await request(app)
        .get("/transactions")
        .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("origin", 1);
});

test("basic transaction test", async () => {
    const res = await request(app)
        .get("/transactions")
        .set("Authorization", "Bearer fake-token");
    expect(res.statusCode).toBe(401);
});
