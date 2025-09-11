import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';

const siteConfig = {
  name: 'EduKita',
  description: 'Portal Berita Pendidikan Terkini - Informasi seputar penerimaan mahasiswa, siswa, peraturan pemerintah, beasiswa, dan edukasi.',
  url: 'https://edukita.example.com', // Ganti dengan URL domain Anda
  ogImage: 'https://edUKita.example.com/og-image.png', // Ganti dengan URL gambar default Anda
};


export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  verification: {
    google: "ezt_ZYW0rteNiui-SK3bL4jHiP06_aMqSYzqt5qNWhs",
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: '/favicon.ico', // Pastikan Anda memiliki favicon.ico di folder public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <div className="relative flex min-h-screen w-full flex-col">
          <Header />
          <main className="flex-1">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
