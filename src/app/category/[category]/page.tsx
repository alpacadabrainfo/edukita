import { newsArticles } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import NewsCard from '@/components/news/news-card';
import { Tag } from 'lucide-react';

type Props = {
  params: { category: string }
}

function capitalizeWords(str: string) {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryName = params.category.replace(/-/g, ' ');
  const title = capitalizeWords(categoryName);
  const description = `Jelajahi semua berita dan artikel pendidikan dalam kategori ${title}. Dapatkan informasi terbaru seputar ${title} hanya di EduKita.`;

  const categoryExists = newsArticles.some(a => a.category.toLowerCase() === categoryName);

  if (!categoryExists) {
    return {
      title: 'Kategori tidak ditemukan'
    }
  }

  const url = `/category/${params.category}`;
 
  return {
    title: `Kategori: ${title}`,
    description: description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `Kategori: ${title} | EduKita`,
      description: description,
      url: url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Kategori: ${title} | EduKita`,
      description: description,
    }
  }
}


export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryName = params.category.replace(/-/g, ' ');
  const articles = newsArticles.filter(article => article.category.toLowerCase() === categoryName);

  if (articles.length === 0) {
    notFound();
  }

  const title = capitalizeWords(categoryName);

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
