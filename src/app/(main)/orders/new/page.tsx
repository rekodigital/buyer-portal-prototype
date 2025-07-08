// src/app/(main)/orders/new/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const products = [
  { id: "p1", name: "Chicken Feet Grade A" },
  { id: "p2", name: "Chicken Paws Grade B" },
  { id: "p3", name: "Whole Frozen Chicken" },
  { id: "p4", name: "Chicken MDM" },
];

const newOrderSchema = z.object({
  productId: z.string({ required_error: "Produk harus dipilih." }),
  quantity: z.coerce.number().min(1, "Kuantitas minimal 1 MT."),
  poFile: z.instanceof(File).optional(),
});

export default function NewOrderPage() {
  const form = useForm<z.infer<typeof newOrderSchema>>({
    resolver: zodResolver(newOrderSchema),
  });

  function onSubmit(values: z.infer<typeof newOrderSchema>) {
    console.log("Data Order Baru:", values);
    alert(`Order untuk produk ID ${values.productId} sejumlah ${values.quantity} MT berhasil dibuat!`);
    form.reset({ quantity: 0 });
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Place New Order</CardTitle>
        <CardDescription>Isi detail pesanan baru Anda.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pilih Produk</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Pilih produk ekspor..." /></SelectTrigger>
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
                  <FormLabel>Kuantitas (dalam MT)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Contoh: 27" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="poFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload PO (Opsional)</FormLabel>
                  <FormControl>
                    <Input type="file" onChange={(e) => field.onChange(e.target.files?.[0])} />
                  </FormControl>
                   <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit Order</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}