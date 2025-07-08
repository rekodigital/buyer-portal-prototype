// src/app/(main)/orders/history/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const orders = [
  { id: "PO123", product: "Chicken Feet Grade A", qty: 27, port: "Singapore", status: "In Production" },
  { id: "PO124", product: "Chicken Paws Grade B", qty: 26, port: "Klang, Malaysia", status: "Ready to Ship" },
  { id: "PO125", product: "Whole Frozen Chicken", qty: 25, port: "Ho Chi Minh, Vietnam", status: "Completed" },
  { id: "PO126", product: "Chicken Feet Grade A", qty: 27, port: "Singapore", status: "On Board Vessel" },
  { id: "PO127", product: "Chicken MDM", qty: 28, port: "Bangkok, Thailand", status: "Completed" },
];

type BadgeVariant = React.ComponentProps<typeof Badge>["variant"];

const getStatusVariant = (status: string): BadgeVariant => {
  switch (status) {
    case "Completed":
      return "default";
    case "Ready to Ship":
      return "secondary";
    case "In Production":
      return "outline";
    case "On Board Vessel":
        return "destructive";
    default:
      return "default";
  }
};

export default function OrderHistoryPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Riwayat Order</h1>
        <Link href="/orders/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Order Baru
          </Button>
        </Link>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Produk</TableHead>
              <TableHead>Qty (MT)</TableHead>
              <TableHead>Port Tujuan</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  <Link href={`/orders/${order.id}`} className="text-blue-600 hover:underline">
                    {order.id}
                  </Link>
                </TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.qty}</TableCell>
                <TableCell>{order.port}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}