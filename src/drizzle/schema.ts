import {
  int,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const transactionsDrizzle = mysqlTable("transactions_drizzle", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 144 }),
  amount: int("amount"),
  createdAt: timestamp("created_at").defaultNow(),
});
