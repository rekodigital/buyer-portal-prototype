// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // Impor konfigurasi dari file baru

// Buat handler menggunakan konfigurasi yang diimpor
const handler = NextAuth(authOptions);

// Ekspor handler untuk metode GET dan POST, sesuai aturan Next.js
export { handler as GET, handler as POST };