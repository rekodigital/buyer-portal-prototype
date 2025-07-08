// src/app/(main)/documents/certificates/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";

const certificates = [
  {
    name: "Sertifikat Halal MUI",
    description: "Sertifikat Halal resmi yang dikeluarkan oleh Majelis Ulama Indonesia.",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    name: "Health Certificate (HC)",
    description: "Sertifikat kesehatan yang menyatakan produk layak untuk dikonsumsi.",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    name: "Certificate of Analysis (COA)",
    description: "Hasil analisis laboratorium untuk setiap batch produksi.",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
   {
    name: "Veterinary Certificate",
    description: "Sertifikat yang dikeluarkan oleh otoritas veteriner negara asal.",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];


export default function CertificatesPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dokumen & Sertifikat</h2>
      <div className="space-y-4">
        {certificates.map((cert, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <FileText className="w-8 h-8 text-gray-500" />
                <div>
                  <CardTitle>{cert.name}</CardTitle>
                  <CardDescription>{cert.description}</CardDescription>
                </div>
              </div>
              <a href={cert.url} download target="_blank" rel="noopener noreferrer">
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Unduh
                </Button>
              </a>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}