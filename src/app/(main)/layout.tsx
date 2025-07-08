// src/app/(main)/layout.tsx
"use client"; // Diperlukan untuk state dan event handler

import { useState, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Tampilkan loading state saat sesi sedang diverifikasi
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  // --- PERUBAHAN DI SINI ---
  // Komponen navigasi sekarang menerima prop 'onLinkClick'
  const SidebarNav = ({ onLinkClick }: { onLinkClick: () => void }) => (
    <nav className="flex flex-col justify-between h-full pb-4">
      <ul className="space-y-2">
        <li><Link href="/dashboard" onClick={onLinkClick} className="font-semibold hover:text-blue-600 block py-1">Dashboard</Link></li>
        <li><Link href="/orders/history" onClick={onLinkClick} className="font-semibold hover:text-blue-600 block py-1">Orders</Link></li>
        <li><Link href="/products/catalog" onClick={onLinkClick} className="font-semibold hover:text-blue-600 block py-1">Products</Link></li>
        <li><Link href="/documents/certificates" onClick={onLinkClick} className="font-semibold hover:text-blue-600 block py-1">Documents</Link></li>
      </ul>
      <ul className="space-y-2 border-t pt-4 mt-4">
        <li><Link href="/support/contact" onClick={onLinkClick} className="font-semibold hover:text-blue-600 block py-1">Support</Link></li>
        <li><Link href="/account/profile" onClick={onLinkClick} className="font-semibold hover:text-blue-600 block py-1">Account</Link></li>
      </ul>
    </nav>
  );

  return (
    <div className="relative min-h-screen md:flex">
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
          "fixed inset-y-0 left-0 z-30 w-64 bg-gray-100 p-4 border-r",
          "transform transition-transform duration-300 ease-in-out",
          "md:relative md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-bold text-xl">
            <Link href="/dashboard">Buyer Portal</Link>
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        {/* --- PERUBAHAN DI SINI --- */}
        {/* Kirim fungsi untuk menutup sidebar ke komponen navigasi */}
        <SidebarNav onLinkClick={() => setIsSidebarOpen(false)} />
      </aside>

      {/* Konten Utama */}
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between md:justify-end p-2 md:p-4 border-b bg-white">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <p className="text-right">Welcome, {session.user?.name}</p>
        </header>
        <main className="p-4 md:p-8 bg-gray-50 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

// Perubahan kecil untuk memicu git