import { dataSource } from "./../database/index";
import request from "supertest";
import { app } from "../app";
import { User } from "../models/User";

describe("User", () => {
  beforeAll(async () => {
    const connection = await dataSource.initialize();
    await connection.runMigrations();
  });

  test("should be able to create a user", async () => {
    const response = await request(app).post("/users").send({
      email: "user@example.com.br",
      name: "User Example",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  test("should not be atle to create a user with existent email", async () => {
    const response = await request(app).post("/users").send({
      email: "user@example.com.br",
      name: "User Example",
    });

    expect(response.status).toBe(400);
  });
});
