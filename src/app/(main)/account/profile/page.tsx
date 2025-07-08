// src/app/(main)/account/profile/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Data dummy. Nantinya diambil dari sesi atau database.
const userProfile = {
  companyName: "PT Maju Jaya",
  contactPerson: "Buyer User",
  email: "buyer@example.com",
  phone: "+62 812 3456 7890",
  address: "Jl. Industri No. 123, Jakarta, Indonesia",
  destinationPort: "Port of Singapore",
  taxId: "12.345.678.9-012.000",
};

type ProfileFormValues = typeof userProfile;

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useForm<ProfileFormValues>({
    defaultValues: userProfile,
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Profile updated:", data);
    setIsEditing(false);
    // Di sini Anda akan memanggil API untuk menyimpan data.
  };

  const handleCancel = () => {
    reset(userProfile); // Kembalikan form ke data awal
    setIsEditing(false);
  };

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Company Profile</CardTitle>
            <CardDescription>
              Lihat dan perbarui informasi perusahaan Anda.
            </CardDescription>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="companyName">Nama Perusahaan</Label>
              <Input id="companyName" {...register("companyName")} disabled={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Kontak Utama</Label>
              <Input id="contactPerson" {...register("contactPerson")} disabled={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telepon</Label>
              <Input id="phone" {...register("phone")} disabled={!isEditing} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Alamat</Label>
              <Input id="address" {...register("address")} disabled={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destinationPort">Default Port Tujuan</Label>
              <Input id="destinationPort" {...register("destinationPort")} disabled={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxId">NPWP / Tax ID</Label>
              <Input id="taxId" {...register("taxId")} disabled={!isEditing} />
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" variant="ghost" onClick={handleCancel}>
                Batal
              </Button>
              <Button type="submit">Simpan Perubahan</Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}