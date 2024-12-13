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
