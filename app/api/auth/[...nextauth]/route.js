// api/[...nextauth]/route.js

import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { bcrypt, hash, compare } from "bcrypt";
import clientPromise from "../../../lib/mongodb";

const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            id: "login",
            name: "MongoDB Login",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "john@example.com",
                },
                password: { label: "Password", type: "password" },
                privileges: { label: "Privileges", type: "text" },
            },
            async authorize(credentials) {
                try {
                    const client = await clientPromise;
                    const db = client.db("capstone");

                    const collection = await db.collection("capstoneusers");
                    const existingUser = await collection.findOne({
                        email: credentials.email,
                    });

                    if (existingUser) {
                        // Compare the provided password with the stored hashed password
                        const passwordMatch = await compare(
                            credentials.password,
                            existingUser.password
                        );

                        if (passwordMatch) {
                            return existingUser;
                        } else {
                            throw new Error("Incorrect password");
                        }
                    } else {
                        throw new Error("User not found. Please sign up first.");
                    }
                } catch (error) {
                    console.error("Error in login authorize:", error);
                    throw new Error("Authentication failed");
                }
            },
        }),
        CredentialsProvider({
            id: "signup",
            name: "MongoDB Signup",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "john@example.com",
                },
                password: { label: "Password", type: "password" },
                privileges: { label: "Privileges", type: "text" },
            },
            async authorize(credentials) {
                try {
                    const client = await clientPromise;
                    const db = client.db("capstone");

                    const collection = await db.collection("capstoneusers");
                    const existingUser = await collection.findOne({
                        email: credentials.email,
                    });

                    if (existingUser) {
                        throw new Error(
                            "User already exists. Choose a different E-Mail address."
                        );
                    }

                    // Hash the password before storing it in the database
                    const hashedPassword = await hash(credentials.password, 10);

                    const newUser = await collection.insertOne({
                        email: credentials.email,
                        password: hashedPassword,
                        privileges: credentials.privileges,
                    });

                    return newUser;
                } catch (error) {
                    console.error("Error in signup authorize:", error);
                    throw new Error("Registration failed");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.privileges = user.privileges;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.privileges = token.privileges;
            return session;
        },
    },
    adapter: MongoDBAdapter(clientPromise),
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 60 * 60 * 24 * 30, // 30 days
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/Login", // specify the path to your custom sign-in page
    },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };