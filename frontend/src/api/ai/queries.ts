import { makeQuery } from './makeQuery';
import {
  BASE_NOTE_SYSTEM_PROMPT,
  NODE_RESPONSE_FORMAT,
  NodeResponse,
  NOTE_SYSTEM_PROMPT,
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

export function extendNoteFragments(currentNote: string, fragments: string[]) {
  return Promise.all(
    fragments.map((fragment) =>
      makeQuery<NodeResponse>(
        [
          { role: 'system', content: NOTE_SYSTEM_PROMPT },
          {
            role: 'user',
            content: JSON.stringify({
              content: currentNote,
              fragment,
            }),
          },
        ],
        NODE_RESPONSE_FORMAT
      )
    )
  );
}

export function improveNote(badNote: string, tipFromUser: string) {
  return makeQuery<NodeResponse>(
    [
      { role: 'system', content: BASE_NOTE_SYSTEM_PROMPT },
      { role: 'assistant', content: badNote },
      { role: 'user', content: tipFromUser },
    ],
    NODE_RESPONSE_FORMAT
  );
}
