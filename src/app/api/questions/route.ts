import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const prompt = (context: string) => `
Generate 4 short questions for a preview of a chatbot.
The user is doing a chat with a trained sickle cell disease chatbot.
The questions should be personalized, for instance.
- How is my SpO2 level today?
- When is my next appointment?
- How can I manage my pain?
- What is the best diet for me?

The questions shouldnt be long, just short and precise.

But, dont use these exact questions, it's just a reference.

Here is the context to help you generate the questions and 4 uuids to help you keep track of the questions:
${uuidv4()} ${uuidv4()} ${uuidv4()} ${uuidv4()}
${context}
`;

const questionsSchema = z.array(z.object({ id: z.string(), question: z.string() }));

export async function POST(req: Request) {
    const context = await req.json();
  const result = await streamObject({
    model: openai('gpt-4-turbo'),
    schema: z.object({ questions: questionsSchema }),
    prompt: prompt(context),
  });

  return result.toTextStreamResponse();
}