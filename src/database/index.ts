import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "sqlite",
  database: "../database/database.sqlite",
});

dataSource.initialize();
