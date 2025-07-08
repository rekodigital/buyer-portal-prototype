// src/app/(main)/dashboard/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Package, Truck, Anchor, Ship, PlusCircle, Upload, Bell, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const dashboardData = {
  orderStatus: { open: 5, inProduction: 3, readyToShip: 2, onBoardVessel: 1 },
  purchaseSummary: { totalVolume: 125, totalValue: 180500 },
  notifications: [
    { id: 1, message: "Pesanan Anda #PO124 sudah siap untuk dikirim.", time: "2 jam lalu" },
    { id: 2, message: "Pembayaran untuk invoice INV-003 telah dikonfirmasi.", time: "1 hari lalu" },
    { id: 3, message: "Sertifikat baru 'COA-2025-Batch-5' telah diunggah.", time: "3 hari lalu" },
  ],
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Ringkasan aktivitas dan pesanan Anda.</p>
        </div>
        {/* --- PASTIKAN BARIS INI BENAR --- */}
        <Button variant="outline" onClick={() => signOut({ callbackUrl: '/login' })}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link href="/orders/new">
          <Button><PlusCircle className="mr-2 h-4 w-4" /> Order Baru</Button>
        </Link>
        <Link href="/documents/upload">
          <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Upload Bukti Bayar</Button>
        </Link>
      </div>

      {/* Sisa kode dasbor... */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.orderStatus.open}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Production</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.orderStatus.inProduction}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ready to Ship</CardTitle>
            <Anchor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.orderStatus.readyToShip}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Board Vessel</CardTitle>
            <Ship className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.orderStatus.onBoardVessel}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Rekap Pembelian</CardTitle>
            <CardDescription>Ringkasan total pembelian Anda.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Volume</span>
              <span className="font-semibold">{dashboardData.purchaseSummary.totalVolume} MT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Nilai</span>
              <span className="font-semibold">${dashboardData.purchaseSummary.totalValue.toLocaleString()}</span>
            </div>
            <div className="mt-4 h-24 rounded-md border flex items-center justify-center bg-slate-50">
              <p className="text-sm text-gray-400">Grafik akan ditampilkan di sini</p>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Notifikasi Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.notifications.map((notif) => (
                <div key={notif.id} className="flex items-start gap-4">
                  <Bell className="h-5 w-5 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium leading-none">{notif.message}</p>
                    <p className="text-xs text-muted-foreground">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}