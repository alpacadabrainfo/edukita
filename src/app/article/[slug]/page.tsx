import Image from 'next/image';
import Link from 'next/link';
import { newsArticles } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Calendar, ExternalLink } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { id as indonesiaLocale } from 'date-fns/locale';
import { Metadata } from 'next';
import NewsCard from '@/components/news/news-card';

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

  const sortedArticles = [...newsArticles].sort(
    (a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
  );
  
  const relatedArticles = sortedArticles.filter(a => a.category === article.category && a.slug !== article.slug).slice(0, 3);
  const otherArticles = sortedArticles.filter(a => a.category !== article.category).slice(0,3);
  const articlesToShow = [...relatedArticles, ...otherArticles.slice(0, Math.max(0, 3-relatedArticles.length))];


  return (
    <div className="container mx-auto py-8">
      <article>
        {/* Hero Section */}
        <div className="relative h-[450px] w-full mb-8 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            priority
            className="object-cover"
            data-ai-hint={article.imageHint}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 text-white">
             <Link href={`/category/${article.category.toLowerCase().replace(/ /g, '-')}`}>
                <Badge variant="secondary" className="mb-3 hover:bg-white/90 transition-colors">
                    {article.category}
                </Badge>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 max-w-4xl">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-200">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={article.publicationDate}>{formattedDate}</time>
                </div>
                <Link href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  Sumber: {article.source} <ExternalLink className="h-4 w-4" />
                </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Article Content */}
          <div className="lg:col-span-8">
            <div className="prose prose-lg max-w-none article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
          
          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8 lg:mt-0">
            <div>
              <h3 className="text-2xl font-bold font-headline mb-4">Berita Terkait</h3>
              <div className="space-y-4">
                {articlesToShow.map((relatedArticle) => (
                  <Link key={relatedArticle.id} href={`/article/${relatedArticle.slug}`} className="group flex items-start gap-4">
                    <div className="relative h-20 w-20 shrink-0 rounded-md overflow-hidden">
                      <Image
                        src={relatedArticle.imageUrl}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover"
                        data-ai-hint={relatedArticle.imageHint}
                        sizes="80px"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold leading-tight group-hover:text-primary transition-colors">{relatedArticle.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{relatedArticle.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </article>

       {/* More News */}
      <div className="mt-16 pt-8 border-t">
            <h2 className="text-3xl font-bold font-headline mb-6 text-center">Jelajahi Berita Lainnya</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedArticles.filter(a => a.slug !== params.slug).slice(0, 3).map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
       </div>

    </div>
  );
}

export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}
