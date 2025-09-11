
'use client';

import React from 'react';
import { newsArticles } from '@/lib/data';
import NewsCard from '@/components/news/news-card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Tag } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { id as indonesiaLocale } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export default function HomePage() {
  const sortedArticles = [...newsArticles].sort(
    (a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
  );

  const heroArticles = sortedArticles.slice(0, 5); // Ambil 5 untuk carousel
  const otherArticles = sortedArticles.slice(5);
  
  const popularArticles = newsArticles.filter(a => ['pendaftaran-mahasiswa-baru-dibuka', 'beasiswa-lpdp-tahap-2', 'program-magang-bersertifikat-kampus-merdeka'].includes(a.slug));
  const latestArticles = sortedArticles.slice(0, 4);
  const categories = [...new Set(newsArticles.map(a => a.category))];

  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8" aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="sr-only">Berita Utama EduKita</h1>
        <div className="mb-8">
          <Carousel 
            className="w-full" 
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 5000, // 5 detik per slide
                stopOnInteraction: false,
              }),
            ]}
          >
            <CarouselContent>
              {heroArticles.map((article) => (
                <CarouselItem key={article.id}>
                  <Link href={`/article/${article.slug}`} className="group block" aria-label={`Baca berita utama: ${article.title}`}>
                    <div className="relative h-[450px] w-full rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        priority
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={article.imageHint}
                        sizes="100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-8 text-white">
                        <Badge variant="secondary" className="mb-2">{article.category}</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-2 max-w-4xl">
                          {article.title}
                        </h2>
                        <p className="text-sm md:text-base text-gray-200 max-w-3xl">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </section>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main content */}
        <section className="lg:col-span-8" aria-labelledby="other-news-heading">
          <h2 id="other-news-heading" className="text-3xl font-bold font-headline mb-6">Berita Lainnya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Categories */}
          <section aria-labelledby="categories-heading">
            <h3 id="categories-heading" className="text-2xl font-bold font-headline mb-4">Kategori</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link key={category} href={`/category/${category.toLowerCase().replace(/ /g, '-')}`} aria-label={`Lihat semua artikel dalam kategori ${category}`}>
                    <Badge variant="outline" className="hover:bg-secondary cursor-pointer">
                        <Tag className="mr-1 h-3 w-3" />
                        {category}
                    </Badge>
                </Link>
              ))}
            </div>
          </section>

          {/* Popular News */}
          <section aria-labelledby="popular-news-heading">
            <h3 id="popular-news-heading" className="text-2xl font-bold font-headline mb-4">Berita Populer</h3>
            <div className="space-y-4">
              {popularArticles.map((article) => (
                <Link key={article.id} href={`/article/${article.slug}`} className="group flex items-start gap-4" aria-label={`Baca artikel populer: ${article.title}`}>
                  <div className="relative h-20 w-20 shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover"
                      data-ai-hint={article.imageHint}
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold leading-tight group-hover:text-primary transition-colors">{article.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{article.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Latest News */}
          <section aria-labelledby="latest-news-heading">
            <h3 id="latest-news-heading" className="text-2xl font-bold font-headline mb-4">Berita Terbaru</h3>
            <div className="space-y-4">
              {latestArticles.map((article) => (
                 <Link key={article.id} href={`/article/${article.slug}`} className="group block" aria-label={`Baca berita terbaru: ${article.title}`}>
                  <p className="font-semibold leading-tight group-hover:text-primary transition-colors">{article.title}</p>
                   <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3" />
                      <time dateTime={article.publicationDate}>
                        {format(parseISO(article.publicationDate), "d MMMM yyyy", { locale: indonesiaLocale })}
                      </time>
                    </div>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
