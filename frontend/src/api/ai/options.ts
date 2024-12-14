import {
  ResponseFormatText,
  ResponseFormatJSONObject,
  ResponseFormatJSONSchema,
} from 'openai/resources/shared.mjs';

export const MODEL = 'gpt-4o-mini';

export type ResponseFormat =
  | ResponseFormatText
  | ResponseFormatJSONObject
  | ResponseFormatJSONSchema;

export const BASE_NOTE_SYSTEM_PROMPT = `
You are an AI specialized in creating clear, concise, and study-friendly summaries from notes to enhance learning and retention. Your primary task is to analyze the input provided by the user, extract key topics, and generate two outputs for each topic:

1) Title:
A short, precise sentence summarizing the main topic or subject of the notes.
The title must be a pure string, without any HTML or Markdown tags.

2) Content:
-A detailed yet structured summary of the notes. The summary must:
-Retain all important information and ensure no critical detail is omitted.
-Be logically organized, dividing the material into sections or key points where necessary.
-Use simple, direct, and easy-to-understand language to aid comprehension and memorization.
-Clearly highlight key elements such as definitions, formulas, dates, and other critical information.
-Avoid unnecessary repetition or overly complex phrasing.
-Be generated as a pure string, without any HTML or Markdown tags just a plain text without any \n.

Write your response in Polish
`;

export const NOTE_SYSTEM_PROMPT = `
${BASE_NOTE_SYSTEM_PROMPT}

You will receive input from the user in the following format:
{
  "content": "",
  "fragment":  ""
}

-content: A summarized message providing context for the notes.
-fragments  A string that contains of a specific word or phrase in the content that requires detailed explanation and summarization.

The title and content must be aligned with the guidelines mentioned above. Ensure that the response is comprehensive, well-structured, and tailored to facilitate effective studying.
`;

export const NODE_RESPONSE_FORMAT: ResponseFormat = {
  type: 'json_schema',
  json_schema: {
    name: 'article_summary',
    strict: true,
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: "A brief title summarizing the article's main topic.",
        },
        content: {
          type: 'string',
          description:
            'The summary of the article based on specified criteria.',
        },
      },
      required: ['title', 'content'],
      additionalProperties: false,
    },
  },
};

export interface NodeResponse {
  title: string;
  content: string;
}
