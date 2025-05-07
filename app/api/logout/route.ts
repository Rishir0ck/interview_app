import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });

  // Clear the cookie (adjust cookie name to your actual auth cookie)
  response.cookies.set("session", "", {
    path: "/",
    maxAge: 0,
  });

  return response;
}
