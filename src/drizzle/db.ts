// db.ts
// import { drizzle } from "drizzle-orm/planetscale-serverless";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

// import { connect } from "@planetscale/database";

// // create the connection
// const connection = connect({
//   host: process.env["DATABASE_HOST"],
//   username: process.env["DATABASE_USERNAME"],
//   password: process.env["DATABASE_PASSWORD"],
// });

const connection = await (async () =>
  mysql.createConnection(process.env["DATABASE_URL"] as string))();

export const db = drizzle(connection);
