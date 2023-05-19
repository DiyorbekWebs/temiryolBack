import * as dotenv from "dotenv";
dotenv.config();
import { DataSource } from "typeorm";

const TypeOrmDataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  name: "default",
  entities: [
    process.env.NODE_ENV !== "production"
      ? "src/**/*.entity.{js,ts}"
      : "dist/**/*.entity.{js,ts}",
  ],
  extra: {
    timezone: "UTC+5",
  },
  logging: false,
  synchronize: true,
});

export default TypeOrmDataSource;
