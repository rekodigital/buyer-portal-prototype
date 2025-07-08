// src/app/(admin)/admin/users/[userId]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { userProfiles } from "@/lib/data"; // Import data terpusat

export default function UserDetailPage() {
  const params = useParams();
  const userId = params.userId;

  // Cari pengguna berdasarkan ID dari URL
  const user = userProfiles.find((u) => u.id === userId);

  if (!user) {
    return <div className="text-white">User not found.</div>;
  }

  return (
    <Card className="max-w-4xl bg-gray-800 border-gray-700 text-white">
      <CardHeader>
        <CardTitle>Profile: {user.companyName}</CardTitle>
        <CardDescription className="text-gray-400">
          Viewing details for user {user.contactPerson}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Menggunakan UI yang sama persis dengan halaman profil buyer, tapi read-only */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="companyName">Nama Perusahaan</Label>
            <Input id="companyName" value={user.companyName} disabled className="bg-gray-700 border-gray-600" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPerson">Kontak Utama</Label>
            <Input id="contactPerson" value={user.contactPerson} disabled className="bg-gray-700 border-gray-600" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={user.email} disabled className="bg-gray-700 border-gray-600" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telepon</Label>
            <Input id="phone" value={user.phone} disabled className="bg-gray-700 border-gray-600" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Alamat</Label>
            <Input id="address" value={user.address} disabled className="bg-gray-700 border-gray-600" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="destinationPort">Default Port Tujuan</Label>
            <Input id="destinationPort" value={user.destinationPort} disabled className="bg-gray-700 border-gray-600" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="taxId">NPWP / Tax ID</Label>
            <Input id="taxId" value={user.taxId} disabled className="bg-gray-700 border-gray-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}