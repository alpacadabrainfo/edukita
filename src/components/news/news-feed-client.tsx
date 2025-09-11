'use client';
import React, { useState, useMemo, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import NewsCard from './news-card';
import type { NewsArticle } from '@/lib/types';
import { Search, X, BookOpen } from 'lucide-react';

interface NewsFeedClientProps {
  initialArticles: NewsArticle[];
  categories: string[];
}

export default function NewsFeedClient({ initialArticles, categories }: NewsFeedClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    startTransition(() => {
      setSearchTerm(nextValue);
    });
  };

  const handleCategoryChange = (category: string | null) => {
    startTransition(() => {
        setSelectedCategory(category);
    });
  };

  const filteredArticles = useMemo(() => {
    return initialArticles.filter((article) => {
      const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
      const matchesSearch = searchTerm
        ? article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [initialArticles, searchTerm, selectedCategory]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold font-headline text-center">Berita Pendidikan Terkini</h1>
        <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto">
          Jelajahi berita, pengumuman, dan informasi terbaru dari dunia pendidikan yang telah diprioritaskan untuk Anda.
        </p>
      </div>

      <div className="sticky top-[65px] z-40 bg-background/80 py-4 backdrop-blur-md">
        <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm md:flex-row md:items-center">
            <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
                type="text"
                placeholder="Cari berita..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10"
                aria-label="Cari berita"
            />
            </div>
            <div className="flex flex-wrap items-center gap-2">
            <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                onClick={() => handleCategoryChange(null)}
                size="sm"
            >
                Semua
            </Button>
            {categories.map((category) => (
                <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => handleCategoryChange(category)}
                size="sm"
                >
                {category}
                </Button>
            ))}
            </div>
        </div>
      </div>

      <div
        className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 transition-opacity duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-card p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-xl font-semibold">Tidak Ada Berita Ditemukan</h3>
            <p className="mt-1 text-muted-foreground">Coba ubah filter atau kata kunci pencarian Anda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
