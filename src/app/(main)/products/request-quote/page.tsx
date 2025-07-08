// src/app/(main)/products/request-quote/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


// Data produk dummy
const products = [
  { id: "p1", name: "Chicken Feet Grade A" },
  { id: "p2", name: "Chicken Paws Grade B" },
  { id: "p3", name: "Whole Frozen Chicken" },
  { id: "p4", name: "Chicken MDM" },
];

const rfqSchema = z.object({
  productId: z.string({ required_error: "Produk harus dipilih." }),
  quantity: z.coerce.number().min(1, "Kuantitas harus diisi."),
  targetPrice: z.coerce.number().optional(),
  destinationPort: z.string().min(3, "Port tujuan harus diisi."),
  notes: z.string().optional(),
});

export default function RequestQuotePage() {
  const form = useForm<z.infer<typeof rfqSchema>>({
    resolver: zodResolver(rfqSchema),
  });

  function onSubmit(values: z.infer<typeof rfqSchema>) {
    console.log("Data RFQ:", values);
    alert("Permintaan penawaran Anda telah berhasil dikirim!");
    form.reset();
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Request for Quotation (RFQ)</CardTitle>
        <CardDescription>
          Isi form di bawah ini untuk meminta penawaran harga khusus.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* ... Form fields akan kita tambahkan di sini ... */}
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Produk</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Pilih produk..." /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {products.map((p) => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimasi Kuantitas (MT)</FormLabel>
                  <FormControl><Input type="number" placeholder="Contoh: 100" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="destinationPort"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Port Tujuan</FormLabel>
                  <FormControl><Input placeholder="Contoh: Port Klang, Malaysia" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catatan Tambahan</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Contoh: Mohon info untuk spesifikasi packing..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Kirim Permintaan</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}