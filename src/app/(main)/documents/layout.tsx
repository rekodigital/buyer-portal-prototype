// src/app/(main)/documents/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // Fungsi helper dari shadcn

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navLinks = [
    { name: "Certificates", href: "/documents/certificates" },
    { name: "Invoices", href: "/documents/invoices" },
    { name: "Upload Proof of Payment", href: "/documents/upload" }, // Kita siapkan untuk nanti
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Documents</h1>
        <p className="text-muted-foreground">
          Kelola semua dokumen terkait pesanan Anda di sini.
        </p>
      </div>
      <div className="flex border-b">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "py-2 px-4 text-sm font-medium",
              pathname === link.href
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
}