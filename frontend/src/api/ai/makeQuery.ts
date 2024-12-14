import { openAI } from './instance';
import { MODEL, ResponseFormat } from './options';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

export async function makeQuery<T>(
  messages: ChatCompletionMessageParam[],
  responseFormat: ResponseFormat
): Promise<T> {
  const completion = await openAI.chat.completions.create({
    model: MODEL,
    messages,
    response_format: responseFormat,
    temperature: 0.4,
    max_completion_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  const content = completion.choices[0].message.content;
  if (content === null) {
    throw new Error('No content in completion');
  }

  return JSON.parse(content) as T;
}
