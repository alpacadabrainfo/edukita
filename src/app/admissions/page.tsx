import { admissions } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { School, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Info Pendaftaran Perguruan Tinggi | EduKita',
  description: 'Jadwal penting, persyaratan, dan tautan pendaftaran untuk universitas pilihan di Indonesia.',
};

export default function AdmissionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <School className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-4xl font-bold font-headline">Informasi Pendaftaran Perguruan Tinggi</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          Jadwal penting, persyaratan, dan tautan pendaftaran untuk universitas pilihan.
        </p>
      </div>
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>Daftar Universitas</CardTitle>
          <CardDescription>
            Informasi pendaftaran jalur mandiri untuk beberapa perguruan tinggi negeri.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[250px]">Universitas</TableHead>
                  <TableHead>Batas Pendaftaran</TableHead>
                  <TableHead className="min-w-[200px]">Persyaratan</TableHead>
                  <TableHead className="text-right">Portal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admissions.map((adm) => (
                  <TableRow key={adm.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0">
                          <Image
                            src={adm.logoUrl}
                            alt={`${adm.university} logo`}
                            fill
                            className="object-contain"
                            data-ai-hint={adm.logoHint}
                            sizes="40px"
                          />
                        </div>
                        {adm.university}
                      </div>
                    </TableCell>
                    <TableCell>{adm.deadline}</TableCell>
                    <TableCell>
                      <ul className="list-disc list-inside text-xs space-y-1">
                        {adm.documents.map((doc, i) => (
                          <li key={i}>{doc}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild size="sm" variant="outline" className="bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground border-0">
                        <Link href={adm.portalUrl} target="_blank" rel="noopener noreferrer">
                          Daftar <ExternalLink className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
