import type { NextAuthConfig } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

import { env } from "@/env";

export default {
  providers: [
    EmailProvider({
      id: "resend",
      type: "email",
      async sendVerificationRequest({ identifier: email, url }) {
        if (process.env.NODE_ENV === "development") {
          console.log(`Login link: ${url}, Email: ${email}`);
          return;
        } else {
          // add resend
        }
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
} satisfies NextAuthConfig;
