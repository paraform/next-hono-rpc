import { users } from "./schema";

export type UserProps = typeof users.$inferSelect;
export type UserInsertProps = typeof users.$inferInsert;
