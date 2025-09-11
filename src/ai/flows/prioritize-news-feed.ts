// src/ai/flows/prioritize-news-feed.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for prioritizing news feed items based on relevance and timeliness.
 * It uses AI to rank news articles and returns a sorted list of articles.
 *
 * - prioritizeNewsFeed - A function that takes a list of news articles and returns a prioritized list.
 * - PrioritizeNewsFeedInput - The input type for the prioritizeNewsFeed function, which is a list of news articles.
 * - PrioritizeNewsFeedOutput - The output type for the prioritizeNewsFeed function, which is a prioritized list of news articles.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NewsArticleSchema = z.object({
  title: z.string().describe('The title of the news article.'),
  content: z.string().describe('The content of the news article.'),
  url: z.string().url().describe('The URL of the news article.'),
  publicationDate: z.string().describe('The publication date of the news article.'),
  category: z.string().describe('The category of the news article (e.g., higher education, government regulations).'),
});

export type NewsArticle = z.infer<typeof NewsArticleSchema>;

const PrioritizeNewsFeedInputSchema = z.array(NewsArticleSchema).describe('A list of news articles to prioritize.');
export type PrioritizeNewsFeedInput = z.infer<typeof PrioritizeNewsFeedInputSchema>;

const PrioritizeNewsFeedOutputSchema = z.array(NewsArticleSchema).describe('A prioritized list of news articles.');
export type PrioritizeNewsFeedOutput = z.infer<typeof PrioritizeNewsFeedOutputSchema>;

export async function prioritizeNewsFeed(input: PrioritizeNewsFeedInput): Promise<PrioritizeNewsFeedOutput> {
  return prioritizeNewsFeedFlow(input);
}

const prioritizeNewsFeedPrompt = ai.definePrompt({
  name: 'prioritizeNewsFeedPrompt',
  input: {schema: PrioritizeNewsFeedInputSchema},
  output: {schema: PrioritizeNewsFeedOutputSchema},
  prompt: `You are an AI assistant that specializes in prioritizing a news feed based on relevance and timeliness.

  Given the following list of news articles, rank them in order of importance, with the most important articles listed first.
  Consider the publication date, category, and content of each article when determining its importance.
  Return the list of articles in the prioritized order.

  Prioritized News Articles:
  {{#each this}}
  - Title: {{title}}
    Content: {{content}}
    URL: {{url}}
    Publication Date: {{publicationDate}}
    Category: {{category}}
  {{/each}}`,
});

const prioritizeNewsFeedFlow = ai.defineFlow({
    name: 'prioritizeNewsFeedFlow',
    inputSchema: PrioritizeNewsFeedInputSchema,
    outputSchema: PrioritizeNewsFeedOutputSchema,
  },
  async input => {
    const {output} = await prioritizeNewsFeedPrompt(input);
    return output!;
  }
);
