// src/app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  strategy: "jwt",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const users = [
            { id: "1", name: "Buyer User", email: "buyer@example.com", password: "password123", role: "buyer" },
            { id: "2", name: "Admin User", email: "admin@example.com", password: "admin123", role: "admin" },
        ];
        const user = users.find(u => u.email === credentials?.email);
        if (user && user.password === credentials?.password) {
            const { password, ...userWithoutPass } = user;
            return userWithoutPass;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
    // --- FUNGSI REDIRECT YANG DIPERBARUI ---
    async redirect({ url, baseUrl, token }) {
      // Saat LOGIN, token akan ada.
      if (token) {
        // Arahkan ke dasbor yang benar berdasarkan peran.
        const targetUrl = token.role === 'admin' 
            ? `${baseUrl}/admin/dashboard` 
            : `${baseUrl}/dashboard`;
        return targetUrl;
      } 
      // Saat LOGOUT, token akan null.
      // `url` akan berisi `callbackUrl` yang kita berikan dari klien.
      else if (url.startsWith(baseUrl)) {
        // Jika URL absolut sudah benar, gunakan itu.
        return url;
      } else if (url.startsWith("/")) {
        // Jika URL relatif (seperti '/login'), gabungkan dengan baseUrl.
        return `${baseUrl}${url}`;
      }
      
      // Sebagai fallback, kembali ke halaman utama.
      return baseUrl;
    }
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };