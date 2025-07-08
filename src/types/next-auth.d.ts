// src/types/next-auth.d.ts

declare module "next-auth" {
  interface User {
    role?: string;
  }

  interface Session {
    user?: {
      role?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}