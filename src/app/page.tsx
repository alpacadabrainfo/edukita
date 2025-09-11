import { prioritizeNewsFeed } from '@/ai/flows/prioritize-news-feed';
import type { PrioritizeNewsFeedInput } from '@/ai/flows/prioritize-news-feed';
import { newsArticles as allArticles } from '@/lib/data';
import NewsFeedClient from '@/components/news/news-feed-client';
import type { NewsArticle } from '@/lib/types';

// The AI flow input might differ slightly from the app's internal type.
// This function maps the app's article data to the format expected by the AI flow.
const mapToAiArticle = (article: NewsArticle): PrioritizeNewsFeedInput[number] => ({
  title: article.title,
  content: article.content,
  url: `https://edukita.example.com/article/${article.slug}`, // The AI needs a stable URL for identification.
  publicationDate: article.publicationDate,
  category: article.category,
});

// This function maps the AI-prioritized articles back to the app's full article objects.
const mapFromAiArticle = (
  aiArticle: PrioritizeNewsFeedInput[number],
  originalArticles: NewsArticle[]
): NewsArticle | undefined => {
  // The AI might slightly alter content, so matching by a unique identifier (URL) is safest.
  return originalArticles.find(
    (a) => `https://edukita.example.com/article/${a.slug}` === aiArticle.url
  );
};

export default async function HomePage() {
  const articlesForAi: PrioritizeNewsFeedInput = allArticles.map(mapToAiArticle);

  let prioritizedArticles: NewsArticle[];
  try {
    // Prioritize articles using the GenAI flow
    const prioritizedAiArticles = await prioritizeNewsFeed(articlesForAi);

    // Map the prioritized articles back to our application's full data structure
    prioritizedArticles = prioritizedAiArticles
      .map((aiArticle) => mapFromAiArticle(aiArticle, allArticles))
      .filter((article): article is NewsArticle => !!article); // Filter out any nulls
  } catch (error) {
    console.error('AI prioritization failed, falling back to chronological order:', error);
    // Fallback: sort by date if the AI flow fails
    prioritizedArticles = [...allArticles].sort(
      (a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
    );
  }

  const categories = [...new Set(allArticles.map((article) => article.category))];

  return (
    <div className="container mx-auto px-4 py-8">
      <NewsFeedClient initialArticles={prioritizedArticles} categories={categories} />
    </div>
  );
}
