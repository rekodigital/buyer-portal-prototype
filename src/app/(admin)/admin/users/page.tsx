// src/app/(admin)/admin/users/page.tsx
"use client";

import Link from "next/link"; // Import Link
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userProfiles } from "@/lib/data"; // Import data terpusat

const getRoleVariant = (role: string) => {
  return role === "admin" ? "destructive" : "secondary";
};

export default function ManageUsersPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
          Add New User
        </Button>
      </div>
      <div className="border rounded-md border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700">
              <TableHead className="text-white">Contact Person</TableHead>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Company</TableHead>
              <TableHead className="text-white">Role</TableHead>
              <TableHead className="text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userProfiles.map((user) => (
              <TableRow key={user.id} className="border-gray-700">
                <TableCell className="font-medium">
                  {/* Nama sekarang menjadi Link */}
                  <Link href={`/admin/users/${user.id}`} className="hover:underline text-yellow-400">
                    {user.contactPerson}
                  </Link>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.companyName}</TableCell>
                <TableCell>
                  <Badge variant={getRoleVariant(user.role) as any}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit User</DropdownMenuItem>
                      <DropdownMenuItem>View Orders</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}