import isEqual from "lodash/isEqual";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import { initializeDB } from "@/lib/initializeDB";
import UserModel from "@/models/user.model";
import { isEmpty } from "lodash";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter email and password");
        }

        try {
          await initializeDB();
          const user = await UserModel.findOne(
            {
              email: credentials.email,
            },
            { email: 1, password: 1 }
          );
          if (isEmpty(user)) {
            throw new Error("Invalid Email or Password");
          }
          const isPasswordMatch = await bcrypt.compare(
            credentials.password,
            user.password!
          );
          if (!isPasswordMatch) {
            throw new Error("Invalid Email or Password");
          }
          return user;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  debug: isEqual(process.env.NODE_ENV, "development"),
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
