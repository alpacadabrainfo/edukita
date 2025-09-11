import { newsArticles } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import NewsCard from '@/components/news/news-card';
import { Tag } from 'lucide-react';

type Props = {
  params: { category: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryName = params.category.replace(/-/g, ' ');
  const categoryExists = newsArticles.some(a => a.category.toLowerCase() === categoryName);

  if (!categoryExists) {
    return {
      title: 'Kategori tidak ditemukan'
    }
  }

  const title = categoryName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
 
  return {
    title: `Kategori: ${title} | EduKita`,
    description: `Berita dan artikel dalam kategori ${title}.`,
  }
}


export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryName = params.category.replace(/-/g, ' ');
  const articles = newsArticles.filter(article => article.category.toLowerCase() === categoryName);

  if (articles.length === 0) {
    notFound();
  }

  const title = categoryName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="container mx-auto px-4 py-8">
       <div className="mb-8 text-center">
        <Tag className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-4xl font-bold font-headline">Kategori: {title}</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          Menampilkan semua berita dan artikel dalam kategori {title}.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
    const categories = [...new Set(newsArticles.map(a => a.category))];
    return categories.map((category) => ({
      category: category.toLowerCase().replace(/ /g, '-'),
    }));
}
