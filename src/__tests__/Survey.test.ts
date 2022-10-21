import { dataSource } from "./../database/index";
import request from "supertest";
import { app } from "../app";

describe("Survey", () => {
  beforeAll(async () => {
    const connection = await dataSource.initialize();
    await connection.runMigrations();
  });

  test("should be able to create a survey", async () => {
    const response = await request(app).post("/surveys").send({
      title: "Test title",
      description: "Test description",
    });

    expect(response.status).toBe(201);
  });

  test("should be able to get all surveys", async () => {
    await request(app).post("/surveys").send({
      title: "Test title",
      description: "Test description",
    });

    const response = await request(app).get("/surveys");

    expect(response.body.length).toBe(2);
  });
});
