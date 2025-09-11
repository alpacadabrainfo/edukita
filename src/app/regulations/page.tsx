import { regulations } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gavel, Calendar, ExternalLink, Building } from 'lucide-react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { id as indonesiaLocale } from 'date-fns/locale';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regulasi Pemerintah | EduKita',
  description: 'Kumpulan dokumen dan peraturan pemerintah resmi terkait dunia pendidikan di Indonesia.',
};

export default function RegulationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <Gavel className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-4xl font-bold font-headline">Regulasi Pemerintah</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          Temukan dokumen dan peraturan resmi yang membentuk lanskap pendidikan di Indonesia.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {regulations.map((reg) => (
          <Card key={reg.id} className="flex flex-col rounded-xl">
            <CardHeader>
              <CardTitle>{reg.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{reg.summary}</p>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>Diterbitkan oleh: {reg.issuedBy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                   <time dateTime={reg.effectiveDate}>
                    Berlaku sejak: {format(parseISO(reg.effectiveDate), "d MMMM yyyy", { locale: indonesiaLocale })}
                  </time>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href={reg.documentUrl} target="_blank" rel="noopener noreferrer">
                  Lihat Dokumen
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
