// src/app/(main)/documents/upload/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const uploadSchema = z.object({
  invoiceNumber: z.string().min(1, "Nomor invoice harus diisi."),
  paymentProof: z
    .instanceof(File, { message: "File bukti bayar harus diupload." })
    .refine((file) => file.size > 0, "File bukti bayar harus diupload."),
  notes: z.string().optional(),
});

export default function UploadPage() {
  const form = useForm<z.infer<typeof uploadSchema>>({
    resolver: zodResolver(uploadSchema),
  });

  function onSubmit(values: z.infer<typeof uploadSchema>) {
    console.log("Data Upload:", values);
    alert(`Bukti bayar untuk invoice ${values.invoiceNumber} berhasil diupload!`);
    form.reset({ invoiceNumber: "", notes: "" });
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold mb-4">Upload Bukti Pembayaran</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="invoiceNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Invoice Referensi</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: INV-002" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentProof"
            render={({ field: { onChange, ...rest } }) => (
              <FormItem>
                <FormLabel>File Bukti Bayar (TT Copy)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => onChange(e.target.files?.[0])}
                    {...rest}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catatan (Opsional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Contoh: Pembayaran dari Bank ABC, SWIFT Code: ABCDE..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Upload File</Button>
        </form>
      </Form>
    </div>
  );
}