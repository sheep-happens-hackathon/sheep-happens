import { makeQuery } from './makeQuery';
import {
  BASE_NOTE_SYSTEM_PROMPT,
  NODE_RESPONSE_FORMAT,
  NodeResponse,
} from './options';

export function summarizeBaseNote(baseNote: string) {
  return makeQuery<NodeResponse>(
    [
      { role: 'system', content: BASE_NOTE_SYSTEM_PROMPT },
      { role: 'user', content: baseNote },
    ],
    NODE_RESPONSE_FORMAT
  );
}
