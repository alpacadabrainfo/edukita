'use server';

import { summarizeArticle } from '@/ai/flows/summarize-article';
import { z } from 'zod';

const summarizeSchema = z.object({
  articleText: z.string().min(100, 'Article text is too short to summarize.'),
});

type State = {
  message: string;
  summary?: string;
  error?: string | null;
};

export async function getSummary(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = summarizeSchema.safeParse({
    articleText: formData.get('articleText'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed.',
      error: validatedFields.error.flatten().fieldErrors.articleText?.join(', ') ?? 'Invalid input.',
    };
  }

  try {
    const result = await summarizeArticle({ articleText: validatedFields.data.articleText });
    if (!result.summary) {
      return {
        message: 'error',
        error: 'AI service returned an empty summary.',
      };
    }
    return {
      message: 'success',
      summary: result.summary,
    };
  } catch (e) {
    console.error(e);
    return {
      message: 'error',
      error: 'An error occurred while communicating with the AI service.',
    };
  }
}
