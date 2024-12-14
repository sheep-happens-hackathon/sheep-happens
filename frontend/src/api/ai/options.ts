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
-Be generated in HTML format to ensure compatibility and readability, rather than Markdown.
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
