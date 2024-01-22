import { type tasks, type users } from "./schema";

export type UserProps = typeof users.$inferSelect;
export type UserInsertProps = typeof users.$inferInsert;
export type TaskProps = typeof tasks.$inferSelect;
export type TaskInsertProps = typeof tasks.$inferInsert;
