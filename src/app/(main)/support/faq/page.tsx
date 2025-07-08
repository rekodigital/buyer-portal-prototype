// src/app/(main)/support/faq/page.tsx
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Data dummy untuk FAQ
const faqItems = [
  {
    question: "Bagaimana proses pemesanan ekspor?",
    answer: "Prosesnya dimulai dari Anda melakukan 'Place Order' atau 'Request for Quote' melalui portal ini. Tim kami akan memverifikasi pesanan dan mengeluarkan Proforma Invoice. Setelah pembayaran DP diterima, kami akan memulai proses produksi dan persiapan pengiriman.",
  },
  {
    question: "Berapa lama waktu produksi hingga barang siap kirim?",
    answer: "Waktu produksi bervariasi tergantung pada produk dan volume pesanan. Secara umum, estimasi waktu produksi adalah 14-21 hari kerja setelah konfirmasi pembayaran diterima.",
  },
  {
    question: "Dokumen apa saja yang akan saya terima?",
    answer: "Anda akan menerima set lengkap dokumen pengiriman, termasuk Bill of Lading (B/L), Commercial Invoice, Packing List, Certificate of Origin (COO), Health Certificate (HC), dan Sertifikat Halal. Semua dokumen dapat diunduh melalui menu 'Documents' di portal ini.",
  },
  {
    question: "Bagaimana cara melacak status pengiriman saya?",
    answer: "Nomor kontainer dan nomor Bill of Lading (B/L) akan tersedia di halaman detail pesanan Anda setelah barang dimuat ke kapal. Anda dapat menggunakan nomor tersebut untuk melacak pengiriman langsung di situs web perusahaan pelayaran.",
  },
  {
    question: "Apa saja metode pembayaran yang diterima?",
    answer: "Kami menerima pembayaran melalui Telegraphic Transfer (T/T) ke rekening bank perusahaan kami. Detail rekening akan tertera pada Proforma Invoice. Anda dapat mengunggah bukti transfer melalui menu 'Documents' > 'Upload Proof of Payment'.",
  },
];

export default function FaqPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions (FAQ)</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}