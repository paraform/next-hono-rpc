import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "@/server/auth/config";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";

import { users } from "@/server/db/schema";
import { db } from "@/server/db";
import { getAccountByUserId, getUserById } from "@/server/auth/actions";
import { mysqlTable } from "../db/schema";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: ExtendedUser;
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db
        .update(users)
        .set({ emailVerified: new Date() })
        .where(eq(users.id, String(user.id)));
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "email") return true;
      if (user.id) {
        const existingUser = await getUserById(user.id);
        // Prevent sign in without email verification
        if (!existingUser?.emailVerified) return false;
      }
      return true;
    },
    async session(opts) {
      if (!("token" in opts)) throw "unreachable with session strategy";
      return {
        ...opts.session,
        user: {
          ...opts.session.user,
          id: opts.token.id as string,
        },
      };
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.id = existingUser.id;
      token.name = existingUser.name;
      token.email = existingUser.email;

      return token;
    },
  },
  adapter: DrizzleAdapter(db, mysqlTable),
  session: { strategy: "jwt" },
  ...authConfig,
});
