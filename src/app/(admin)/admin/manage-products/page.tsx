// src/app/(admin)/admin/manage-products/page.tsx
"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";

// Tipe data untuk produk
interface Product {
  id: string;
  name: string;
  grade: string;
  description: string;
  price: number;
  moq: number;
}

// Data dummy awal
const initialProducts: Product[] = [
  { id: "p1", name: "Chicken Feet", grade: "Grade A", description: "Kaki ayam beku berkualitas tinggi...", price: 1500, moq: 27 },
  { id: "p2", name: "Chicken Paws", grade: "Grade A/B", description: "Ceker ayam beku, ukuran seragam...", price: 1450, moq: 27 },
  { id: "p3", name: "Whole Frozen Chicken", grade: "Standard", description: "Ayam utuh beku tanpa jeroan...", price: 2200, moq: 25 },
];

export default function ManageProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newProductData = {
      name: formData.get("name") as string,
      grade: formData.get("grade") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      moq: Number(formData.get("moq")),
    };

    if (editingProduct) {
      // Update produk yang ada
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...newProductData } : p));
    } else {
      // Tambah produk baru
      setProducts([...products, { id: `p${Date.now()}`, ...newProductData }]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <Button onClick={handleAddNew} className="bg-yellow-400 hover:bg-yellow-500 text-black">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>

      {/* Tabel Produk */}
      <div className="border rounded-md border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700 hover:bg-gray-800/50">
              <TableHead className="text-white">Product Name</TableHead>
              <TableHead className="text-white">Grade</TableHead>
              <TableHead className="text-white">Price ($/ton)</TableHead>
              <TableHead className="text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="border-gray-700 hover:bg-gray-800/50">
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.grade}</TableCell>
                <TableCell>${product.price.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" onClick={() => handleEdit(product)}>Edit</Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the product.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(product.id)}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialog untuk Tambah/Edit Produk */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white border-gray-700">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
              <DialogDescription>
                Make changes to your product here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" name="name" defaultValue={editingProduct?.name} className="col-span-3 bg-gray-700 border-gray-600" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="grade" className="text-right">Grade</Label>
                <Input id="grade" name="grade" defaultValue={editingProduct?.grade} className="col-span-3 bg-gray-700 border-gray-600" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">Price ($)</Label>
                <Input id="price" name="price" type="number" defaultValue={editingProduct?.price} className="col-span-3 bg-gray-700 border-gray-600" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="moq" className="text-right">MOQ (ton)</Label>
                <Input id="moq" name="moq" type="number" defaultValue={editingProduct?.moq} className="col-span-3 bg-gray-700 border-gray-600" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right mt-2">Description</Label>
                <Textarea id="description" name="description" defaultValue={editingProduct?.description} className="col-span-3 bg-gray-700 border-gray-600" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}