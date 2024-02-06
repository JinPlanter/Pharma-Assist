// api/auth.js

import bcrypt from "bcrypt";
import clientPromise from "../../lib/mongodb";

const saltRounds = 10;

export async function POST(req) {
  const { email, password, action, role } = await req.json();
  console.log(req.body);
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const collection = await db.collection("capstone");

  if (action === "register") {
    // Registration
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
      await collection.insertOne({ email, password: hashedPassword, role });
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Failed to register user" }),
        { status: 500 }
      );
    }
  } else if (action === "login") {
    // Login
    const user = await collection.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      return new Response(JSON.stringify({ success: true, role: user.role }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }
  } else {
    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
    });
  }
}
