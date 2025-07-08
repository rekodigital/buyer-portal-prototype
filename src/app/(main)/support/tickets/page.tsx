// src/app/(main)/support/tickets/page.tsx
"use client";

import Link from "next/link";
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
import { PlusCircle } from "lucide-react";

// Data dummy untuk tiket bantuan
const tickets = [
    { id: "TICKET-001", subject: "Pertanyaan tentang pengiriman PO123", status: "Resolved", lastUpdate: "2025-07-05" },
    { id: "TICKET-002", subject: "Dokumen Health Certificate tidak lengkap", status: "In Progress", lastUpdate: "2025-07-08" },
    { id: "TICKET-003", subject: "Konfirmasi pembayaran invoice INV-004", status: "Open", lastUpdate: "2025-07-09" },
    { id: "TICKET-004", subject: "Jadwal loading untuk order baru", status: "Resolved", lastUpdate: "2025-06-28" },
];

// Fungsi untuk menentukan warna Badge berdasarkan status
const getStatusVariant = (status: string) => {
  switch (status) {
    case "Resolved":
      return "default";
    case "In Progress":
      return "secondary";
    case "Open":
      return "destructive";
    default:
      return "default";
  }
};

export default function TicketsPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Riwayat Tiket Anda</h2>
                <Link href="/support/contact">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Buat Tiket Baru
                    </Button>
                </Link>
            </div>
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ticket ID</TableHead>
                            <TableHead>Subjek</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Update Terakhir</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tickets.map((ticket) => (
                            <TableRow key={ticket.id}>
                                <TableCell className="font-medium">{ticket.id}</TableCell>
                                <TableCell>{ticket.subject}</TableCell>
                                <TableCell>
                                    <Badge variant={getStatusVariant(ticket.status) as any}>{ticket.status}</Badge>
                                </TableCell>
                                <TableCell>{ticket.lastUpdate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}