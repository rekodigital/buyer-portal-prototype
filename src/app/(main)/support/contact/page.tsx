// src/app/(main)/support/contact/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Phone, Mail } from "lucide-react";

const contactSchema = z.object({
  subject: z.string().min(5, "Subjek minimal 5 karakter."),
  orderId: z.string().optional(),
  message: z.string().min(10, "Pesan minimal 10 karakter."),
});

export default function ContactPage() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
  });

  function onSubmit(values: z.infer<typeof contactSchema>) {
    console.log("Pesan Kontak Terkirim:", values);
    alert("Pesan Anda telah berhasil dikirim. Tim kami akan segera merespons.");
    form.reset({ subject: "", orderId: "", message: "" });
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {/* Kolom Form Kontak */}
      <div className="md:col-span-2">
        <h2 className="text-2xl font-semibold mb-4">Kirim Pesan</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subjek</FormLabel>
                  <FormControl><Input placeholder="Contoh: Pertanyaan tentang pengiriman" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="orderId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Order (Opsional)</FormLabel>
                  <FormControl><Input placeholder="Contoh: PO123" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pesan Anda</FormLabel>
                  <FormControl><Textarea placeholder="Tuliskan detail pertanyaan atau masalah Anda di sini..." rows={6} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Kirim Pesan</Button>
          </form>
        </Form>
      </div>

      {/* Kolom Info Kontak */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Info Kontak</h2>
        <Card>
          <CardHeader>
            <CardTitle>Hubungi Langsung</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full justify-start">
                <Phone className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
            </a>
            <a href="mailto:sales@example.com">
              <Button variant="outline" className="w-full justify-start">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}