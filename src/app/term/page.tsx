// 1. Buat file: src/app/terms/page.tsx
// Masukkan kode ini:

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Terms and Conditions</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Buyer Portal. These terms and conditions outline the rules and regulations for the use of our website. By accessing this website we assume you accept these terms and conditions.
          </p>

          <h2>2. Orders and Payments</h2>
          <p>
            All orders placed through this portal are subject to acceptance and availability. We reserve the right to refuse an order for any reason. Payment terms will be specified in the proforma invoice.
          </p>

          <h2>3. Intellectual Property Rights</h2>
          <p>
            Other than the content you own, under these Terms, [Your Company Name] and/or its licensors own all the intellectual property rights and materials contained in this Website.
          </p>
          
          <p><em>(Ganti dengan isi Syarat & Ketentuan Anda yang sebenarnya...)</em></p>
        </CardContent>
      </Card>
    </div>
  );
}