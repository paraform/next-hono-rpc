import { db } from "@/server/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.query.accounts.findFirst({
      where: (users, { eq }) => eq(users.userId, userId),
    });

    return account;
  } catch (error) {
    console.error(error);
    return null;
  }
};
