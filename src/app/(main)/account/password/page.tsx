// src/app/(main)/account/password/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";

// Skema validasi dengan konfirmasi password
const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Kata sandi saat ini harus diisi."),
  newPassword: z.string().min(8, "Kata sandi baru minimal 8 karakter."),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Konfirmasi kata sandi tidak cocok!",
  path: ["confirmPassword"], // Menampilkan error di bawah field konfirmasi
});

export default function ChangePasswordPage() {
  const [formStatus, setFormStatus] = useState({ message: "", isError: false });

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof passwordSchema>) {
    // Di aplikasi nyata, Anda akan memanggil API untuk memvalidasi
    // `currentPassword` dan menyimpan `newPassword`.
    console.log("Data Perubahan Password:", {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    });

    // Simulasi respons dari API
    setFormStatus({ message: "Kata sandi Anda telah berhasil diperbarui.", isError: false });
    form.reset();
    
    // Contoh jika ada error dari server:
    // setFormStatus({ message: "Kata sandi saat ini yang Anda masukkan salah.", isError: true });
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Ubah Kata Sandi</CardTitle>
        <CardDescription>
          Untuk keamanan akun Anda, jangan bagikan kata sandi Anda kepada siapa pun.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kata Sandi Saat Ini</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kata Sandi Baru</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Minimal 8 karakter" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konfirmasi Kata Sandi Baru</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Ketik ulang kata sandi baru" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {formStatus.message && (
              <div className={`text-sm ${formStatus.isError ? 'text-red-500' : 'text-green-600'}`}>
                {formStatus.message}
              </div>
            )}

            <Button type="submit">Perbarui Kata Sandi</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}