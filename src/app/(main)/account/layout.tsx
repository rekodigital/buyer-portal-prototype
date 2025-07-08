// src/app/(main)/account/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Link "Users" telah dihapus dari navigasi
  const navLinks = [
    { name: "Profile", href: "/account/profile" },
    { name: "Password", href: "/account/password" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Account Management</h1>
        <p className="text-muted-foreground">
          Kelola detail profil dan keamanan akun Anda.
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