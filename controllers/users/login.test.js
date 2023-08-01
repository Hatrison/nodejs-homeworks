/* eslint-disable no-undef */
require("dotenv").config();

const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const { User } = require("../../schemas/user");

mongoose.set("strictQuery", false);

const { TEST_DB_HOST } = process.env;

describe("Unit test login controller", () => {
  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);

    await User.deleteMany();

    await User.create({
      password: "$2a$10$n/V1HJ8pLuB.N3Sg18b2Du3qexbw9QILVAA.axTslMhjoC2qHWaHK",
      email: "vadim@gmail.com",
      subscription: "business",
      token: "",
      verify: true,
      verificationToken: "TeSt",
    });
  });

  afterAll(async () => {
    await User.deleteMany();

    await mongoose.disconnect();
  });

  test("should return 200 status for correct user", async () => {
    const response = await supertest(app).post("/api/users/login").send({
      email: "vadim@gmail.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(200);
  });

  test("should return token for correct user", async () => {
    const response = await supertest(app).post("/api/users/login").send({
      email: "vadim@gmail.com",
      password: "123456",
    });

    expect(response.body).toHaveProperty("token");
  });

  test("should return object user with email and subscription which types are String for correct user", async () => {
    const response = await supertest(app).post("/api/users/login").send({
      email: "vadim@gmail.com",
      password: "123456",
    });

    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("email");
    expect(typeof response.body.user.email).toBe("string");
    expect(response.body.user).toHaveProperty("subscription");
    expect(typeof response.body.user.subscription).toBe("string");
  });
});
