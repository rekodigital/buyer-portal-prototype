import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <h2>1. Information We Collect</h2>
          <p>
            We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, place an order, and in connection with other activities, services, features or resources we make available on our Site.
          </p>

          <h2>2. How We Use Collected Information</h2>
          <p>
            [Your Company Name] may collect and use Users personal information for the following purposes: To improve customer service, to personalize user experience, to process payments, etc.
          </p>
          
          <p><em>(Ganti dengan isi Kebijakan Privasi Anda yang sebenarnya...)</em></p>
        </CardContent>
      </Card>
    </div>
  );
}