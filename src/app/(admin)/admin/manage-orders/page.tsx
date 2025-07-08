// src/app/(admin)/admin/manage-orders/page.tsx
"use client";

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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const allOrders = [
  { id: "PO123", buyer: "PT Maju Jaya", product: "Chicken Feet Grade A", qty: 27, port: "Singapore", status: "In Production" },
  { id: "PO124", buyer: "Global Exports Ltd.", product: "Chicken Paws Grade B", qty: 26, port: "Klang, Malaysia", status: "Ready to Ship" },
  { id: "PO125", buyer: "Big Traders Inc.", product: "Whole Frozen Chicken", qty: 25, port: "Ho Chi Minh, Vietnam", status: "Completed" },
  { id: "PO126", buyer: "PT Maju Jaya", product: "Chicken Feet Grade A", qty: 27, port: "Singapore", status: "On Board Vessel" },
  { id: "PO127", buyer: "Global Exports Ltd.", product: "Chicken MDM", qty: 28, port: "Bangkok, Thailand", status: "Completed" },
  { id: "PO128", buyer: "Big Traders Inc.", product: "Chicken Paws Grade A", qty: 27, port: "Laem Chabang", status: "Open" },
];

// --- FUNGSI INI DIPERBARUI ---
const getStatusVariant = (status: string) => {
  switch (status) {
    case "Completed": return "default"; // Hitam
    case "Ready to Ship": return "secondary"; // Abu-abu
    case "In Production": return "secondary"; // Diubah dari 'outline' ke 'secondary'
    case "On Board Vessel": return "destructive"; // Merah
    case "Open": return "secondary"; // Diubah dari 'outline' ke 'secondary'
    default: return "default";
  }
};

export default function ManageOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage All Orders</h1>
        <p className="text-gray-400">View, filter, and update all customer orders.</p>
      </div>

      <div className="flex items-center gap-4">
        <Input placeholder="Filter by Order ID or Buyer..." className="max-w-xs bg-gray-800 border-gray-700" />
        <Select>
          <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in_production">In Production</SelectItem>
            <SelectItem value="ready_to_ship">Ready to Ship</SelectItem>
            <SelectItem value="on_board_vessel">On Board Vessel</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">Apply Filters</Button>
      </div>

      <div className="border rounded-md border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700 hover:bg-gray-800/50">
              <TableHead className="text-white">Order ID</TableHead>
              <TableHead className="text-white">Buyer</TableHead>
              <TableHead className="text-white">Product</TableHead>
              <TableHead className="text-white">Qty (MT)</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allOrders.map((order) => (
              <TableRow key={order.id} className="border-gray-700 hover:bg-gray-800/50">
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.buyer}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.qty}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(order.status) as any}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-700">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Order Details</DropdownMenuItem>
                      <DropdownMenuItem>Update Status</DropdownMenuItem>
                      <DropdownMenuItem>Upload Documents</DropdownMenuItem>
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