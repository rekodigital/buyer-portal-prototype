// src/app/api/auth/role/route.ts

import { getServerSession } from "next-auth/next";
import { authOptions } from "../[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  // Dapatkan sesi di sisi server
  const session = await getServerSession(authOptions);

  // Jika tidak ada sesi, kembalikan error unauthorized
  if (!session || !session.user) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Jika ada sesi, kembalikan peran pengguna
  return NextResponse.json({ role: session.user.role });
}