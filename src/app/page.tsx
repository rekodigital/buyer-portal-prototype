// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function HomePage() {
  // Secara permanen arahkan semua traffic dari halaman utama
  // ke halaman login.
  redirect('/login');

  // Karena redirect terjadi, tidak ada JSX yang perlu dirender di sini.
  // return null; // Baris ini bahkan tidak akan tercapai.
}