// src/app/(main)/documents/invoices/page.tsx
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
import { Download } from "lucide-react";

const invoices = [
    { invoiceNumber: "INV-001", orderId: "PO123", issueDate: "2025-07-20", dueDate: "2025-08-05", amount: 25000, status: "Paid", url: "#" },
    { invoiceNumber: "INV-002", orderId: "PO124", issueDate: "2025-07-22", dueDate: "2025-08-07", amount: 24500, status: "Outstanding", url: "#" },
    { invoiceNumber: "INV-003", orderId: "PO125", issueDate: "2025-07-25", dueDate: "2025-08-10", amount: 28000, status: "Paid", url: "#" },
    { invoiceNumber: "INV-004", orderId: "PO126", issueDate: "2025-07-30", dueDate: "2025-08-15", amount: 25000, status: "Outstanding", url: "#" },
];

const getStatusVariant = (status: string) => {
    return status === "Paid" ? "default" : "destructive";
}

export default function InvoicesPage() {
    return (
        <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Invoice #</TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Tanggal Terbit</TableHead>
                        <TableHead>Jatuh Tempo</TableHead>
                        <TableHead>Jumlah</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.invoiceNumber}>
                            <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                            <TableCell>{invoice.orderId}</TableCell>
                            <TableCell>{invoice.issueDate}</TableCell>
                            <TableCell>{invoice.dueDate}</TableCell>
                            <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                            <TableCell>
                                <Badge variant={getStatusVariant(invoice.status) as any}>{invoice.status}</Badge>
                            </TableCell>
                            <TableCell>
                                <a href={invoice.url} download>
                                    <Button variant="outline" size="sm">
                                        <Download className="mr-2 h-4 w-4" />
                                        Unduh
                                    </Button>
                                </a>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}