// src/app/(auth)/login/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Impor komponen dari Shadcn/ui
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Skema validasi untuk form login
const loginSchema = z.object({
  email: z.string().email("Email tidak valid."),
  password: z.string().min(1, "Password tidak boleh kosong."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null); // Reset pesan error setiap kali submit

    // 1. Coba login, tapi jangan redirect otomatis dari NextAuth
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false, // Ini sangat penting agar browser tidak di-redirect
    });

    // 2. Jika login berhasil (result.ok adalah true)
    if (result?.ok) {
      try {
        // 3. Ambil peran pengguna dari API endpoint kustom kita
        const roleRes = await fetch('/api/auth/role');
        
        if (roleRes.ok) {
          const { role } = await roleRes.json();
          
          // 4. Arahkan ke dasbor yang benar berdasarkan peran
          if (role === 'admin') {
            router.push('/admin/dashboard');
          } else {
            router.push('/dashboard');
          }
        } else {
          // Jika gagal mengambil peran, tampilkan error
          setError("Gagal mendapatkan data sesi. Silakan coba lagi.");
        }
      } catch (e) {
        setError("Terjadi kesalahan jaringan. Silakan coba lagi.");
      }
    } else {
      // Jika login gagal, tampilkan pesan error
      setError("Email atau password yang Anda masukkan salah.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Portal Login</CardTitle>
            <CardDescription>Masuk untuk mengelola pesanan Anda.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Tampilkan pesan error jika ada */}
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md text-sm">
                <p>{error}</p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@example.com" {...register("email")} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Memproses..." : "Login"}
            </Button>
            <p className="mt-4 text-center text-sm text-gray-600">
              <a href="#" className="underline">Lupa password?</a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}