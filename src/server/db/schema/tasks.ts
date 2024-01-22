import { relations, sql } from "drizzle-orm";
import { index, timestamp, varchar } from "drizzle-orm/mysql-core";
import { mysqlTable } from "./_table";
import { users } from ".";

export const tasks = mysqlTable(
  "task",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .default(sql`(uuid())`),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at", { mode: "date" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).onUpdateNow(),
    createdById: varchar("createdById", { length: 255 }).notNull(),
  },
  (task) => ({
    createdByIdIdx: index("createdById_idx").on(task.createdById),
    nameIndex: index("name_idx").on(task.name),
  }),
);

export const tasksRelations = relations(tasks, ({ one }) => ({
  user: one(users, { fields: [tasks.createdById], references: [users.id] }),
}));
