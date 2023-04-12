// db.ts
import { drizzle } from "drizzle-orm/planetscale-serverless";

import { connect } from "@planetscale/database";
import { transactionsDrizzle } from "./schema";
import TRANSACTIONS from "../db/transactions/seed";

// create the connection
const connection = connect({
  host: process.env["DATABASE_HOST"],
  username: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
});

const db = drizzle(connection);

export const allTransactions = async () =>
  await db.select().from(transactionsDrizzle);

export const seedTransactions = async () =>
  await db.insert(transactionsDrizzle).values(TRANSACTIONS);
