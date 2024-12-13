import { getAiSecret } from '@/lib/utils';
import OpenAI from 'openai';

export const openAI = new OpenAI({
  apiKey: getAiSecret(),
  dangerouslyAllowBrowser: true,
});
