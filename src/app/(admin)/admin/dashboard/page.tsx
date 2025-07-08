// src/app/(admin)/admin/dashboard/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="destructive" onClick={() => signOut({ callbackUrl: '/login' })}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
                {/* --- PERUBAHAN DI SINI --- */}
                <CardTitle className="text-sm font-medium text-gray-400">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
                {/* --- PERUBAHAN DI SINI --- */}
                <p className="text-3xl font-bold text-white">128</p>
            </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
                {/* --- PERUBAHAN DI SINI --- */}
                <CardTitle className="text-sm font-medium text-gray-400">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
                {/* --- PERUBAHAN DI SINI --- */}
                <p className="text-3xl font-bold text-white">42</p>
            </CardContent>
        </Card>
         <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
                {/* --- PERUBAHAN DI SINI --- */}
                <CardTitle className="text-sm font-medium text-gray-400">Revenue</CardTitle>
            </CardHeader>
            <CardContent>
                {/* --- PERUBAHAN DI SINI --- */}
                <p className="text-3xl font-bold text-white">$250,730</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}