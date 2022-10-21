import { DataSource } from "typeorm";
import { CreateUsers1666356344930 as CreateUsers } from "./migrations/1666356344930-CreateUsers";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "src/database/database.sqlite",
  migrations: [CreateUsers],
});

dataSource
  .initialize()
  .then((status) => console.log(status))
  .catch((err) => console.log(err));
