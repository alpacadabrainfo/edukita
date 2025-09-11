import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { NewsArticle } from '@/lib/types';
import { format, parseISO } from 'date-fns';
import { id as indonesiaLocale } from 'date-fns/locale';
import { Calendar, ArrowRight } from 'lucide-react';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  let formattedDate = 'Tanggal tidak valid';
  try {
     formattedDate = format(parseISO(article.publicationDate), "d MMMM yyyy", { locale: indonesiaLocale });
  } catch(e) {
    console.error("Invalid date format for article:", article.id);
  }


  return (
    <Link href={`/article/${article.slug}`} className="group block" aria-label={`Baca lebih lanjut tentang ${article.title}`}>
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={article.imageHint}
            />
            <Badge variant="secondary" className="absolute top-3 right-3">{article.category}</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col p-4">
          <CardTitle className="mb-2 text-lg font-bold leading-tight group-hover:text-primary">
            {article.title}
          </CardTitle>
          <p className="flex-grow text-sm text-muted-foreground">
            {article.excerpt}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 pt-0 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={article.publicationDate}>{formattedDate}</time>
            </div>
           <div className="flex items-center gap-1 font-semibold text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Baca Selengkapnya
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
           </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
