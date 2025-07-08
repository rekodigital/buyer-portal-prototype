import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Setup Berhasil!
        </h1>
        <p className="text-muted-foreground">
          Komponen Button dari Shadcn/ui siap digunakan.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Button>Utama</Button>
        <Button variant="secondary">Sekunder</Button>
        <Button variant="destructive">Destruktif</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    </main>
  );
}