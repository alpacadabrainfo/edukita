import Image from 'next/image';
import Link from 'next/link';
import { newsArticles } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Calendar, ExternalLink } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { id as indonesiaLocale } from 'date-fns/locale';
import ArticleSummarizer from '@/components/article/article-summarizer';
import { Metadata } from 'next';

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = newsArticles.find((a) => a.slug === params.slug);
 
  if (!article) {
    return {
      title: 'Artikel tidak ditemukan',
    }
  }
 
  return {
    title: `${article.title} | EduKita`,
    description: article.excerpt,
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = newsArticles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const formattedDate = format(parseISO(article.publicationDate), "d MMMM yyyy", { locale: indonesiaLocale });

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <article className="rounded-xl bg-card p-4 shadow-sm sm:p-6 md:p-8">
        <div className="mb-6">
          <Badge variant="secondary" className="mb-2">{article.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-3">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <time dateTime={article.publicationDate}>{formattedDate}</time>
            </div>
            <span>|</span>
            <Link href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              Sumber: {article.source} <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="relative h-64 md:h-96 w-full mb-6 rounded-lg overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            priority
            className="object-cover"
            data-ai-hint={article.imageHint}
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>
        
        <ArticleSummarizer articleText={article.content} />

        <div className="article-content mt-6" dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}
