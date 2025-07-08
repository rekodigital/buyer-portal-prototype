// src/app/(main)/orders/[orderId]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const orders = [
  { id: "PO123", product: "Chicken Feet Grade A", qty: 27, port: "Singapore", status: "In Production", container: "CMAU1234567", blNumber: "BL-XYZ-987", loadingSchedule: "2025-08-15" },
  { id: "PO124", product: "Chicken Paws Grade B", qty: 26, port: "Klang, Malaysia", status: "Ready to Ship", container: "MSCU7654321", blNumber: "BL-ABC-123", loadingSchedule: "2025-08-10" },
  { id: "PO125", product: "Whole Frozen Chicken", qty: 25, port: "Ho Chi Minh, Vietnam", status: "Completed", container: "TGHU1122334", blNumber: "BL-PQR-456", loadingSchedule: "2025-07-20" },
  { id: "PO126", product: "Chicken Feet Grade A", qty: 27, port: "Singapore", status: "On Board Vessel", container: "FSCU5566778", blNumber: "BL-MNO-789", loadingSchedule: "2025-07-25" },
  { id: "PO127", product: "Chicken MDM", qty: 28, port: "Bangkok, Thailand", status: "Completed", container: "PONU9988776", blNumber: "BL-JKL-012", loadingSchedule: "2025-07-15" },
];

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.orderId;

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return <div>Order tidak ditemukan.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Detail Order #{order.id}</h1>
        <p className="text-muted-foreground">Informasi lengkap untuk pesanan Anda.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Informasi Pengiriman</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4 text-sm">
          <div><strong>Nomor Kontainer:</strong> {order.container}</div>
          <div><strong>Nomor B/L:</strong> {order.blNumber}</div>
          <div><strong>Jadwal Loading:</strong> {order.loadingSchedule}</div>
          <div><strong>Port Tujuan:</strong> {order.port}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Detail Produk</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4 text-sm">
          <div><strong>Produk:</strong> {order.product}</div>
          <div><strong>Kuantitas:</strong> {order.qty} MT</div>
          <div><strong>Status Saat Ini:</strong> <Badge>{order.status}</Badge></div>
        </CardContent>
      </Card>
    </div>
  );
}