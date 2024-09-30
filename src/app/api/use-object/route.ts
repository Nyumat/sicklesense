import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const ingredientsSchema = z.array(z.object({ name: z.string(), amount: z.number() }));

export async function POST(req: Request) {
    console.log(JSON.stringify(req.body));
    const context = await req.json();

  const result = await streamObject({
    model: openai('gpt-4-turbo'),
    schema: z.object({ ingredients: ingredientsSchema }),
    prompt:
      `Generate 4 recipes for a recipe making app in this context:` + context,
  });

  return result.toTextStreamResponse();
}