import { DefaultSession, DefaultUser } from "next-auth"

declare module "next/auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession
  }
  interface User extends DefaultUser {
    id: string
  }
}
