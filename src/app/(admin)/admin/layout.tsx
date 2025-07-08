// src/app/(admin)/admin/layout.tsx
"use client"; // Diperlukan untuk state dan event handler

import { useState, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Validasi role di sisi klien sebagai lapisan tambahan
  if (status === "authenticated" && session.user?.role !== "admin") {
    redirect("/dashboard"); // Arahkan ke dashboard buyer jika bukan admin
  }

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen bg-gray-900 text-white">Loading Admin Panel...</div>;
  }

  // Komponen navigasi untuk sidebar
  const SidebarNav = ({ onLinkClick }: { onLinkClick: () => void }) => (
    <nav>
      <ul className="space-y-2">
        <li><Link href="/admin/dashboard" onClick={onLinkClick} className="font-semibold hover:text-yellow-400 block py-1">Admin Dashboard</Link></li>
        <li><Link href="/admin/users" onClick={onLinkClick} className="font-semibold hover:text-yellow-400 block py-1">Manage Users</Link></li>
        <li><Link href="/admin/manage-orders" onClick={onLinkClick} className="font-semibold hover:text-yellow-400 block py-1">Manage Orders</Link></li>
        <li><Link href="/admin/manage-products" onClick={onLinkClick} className="font-semibold hover:text-yellow-400 block py-1">Manage Products</Link></li>
      </ul>
    </nav>
  );

  return (
    <div className="relative min-h-screen md:flex bg-gray-900 text-white">
      {/* Overlay untuk mobile saat sidebar terbuka */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-20"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 p-4 border-r border-gray-700",
          "transform transition-transform duration-300 ease-in-out",
          "md:relative md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-bold text-xl">
            <Link href="/admin/dashboard">Admin Panel</Link>
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-gray-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <SidebarNav onLinkClick={() => setIsSidebarOpen(false)} />
      </aside>

      {/* Konten Utama */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between md:justify-end p-2 md:p-4 border-b border-gray-700 bg-gray-900">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-gray-700"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <p className="text-right">Welcome, {session?.user?.name}</p>
        </header>

        {/* Isi Halaman */}
        <main className="p-4 md:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}