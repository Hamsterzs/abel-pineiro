import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const connection = await mysql.createConnection({
  host: process.env["DATABASE_HOST"],
  user: process.env["DATABASE_USERNAME"],
  database: "abel-pineiro",
  password: process.env["DATABASE_PASSWORD"],
  ssl: {
    rejectUnauthorized: true,
  },
});

export const db = drizzle(connection, { schema, logger: false });
