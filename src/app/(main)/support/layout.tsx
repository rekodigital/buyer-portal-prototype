// src/app/(main)/support/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navLinks = [
    { name: "Hubungi Kami", href: "/support/contact" },
    { name: "Tiket Bantuan", href: "/support/tickets" },
    { name: "FAQ", href: "/support/faq" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Pusat Bantuan</h1>
        <p className="text-muted-foreground">
          Butuh bantuan? Hubungi kami atau cari jawaban di sini.
        </p>
      </div>
      <div className="flex border-b">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "py-2 px-4 text-sm font-medium",
              pathname.startsWith(link.href)
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