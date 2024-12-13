import { makeQuery } from './makeQuery';
import { NODE_RESPONSE_FORMAT, NodeResponse } from './options';

export function summerizeNote() {
  return makeQuery<NodeResponse>(
    [{ role: 'user', content: 'Write articles about dogs' }],
    NODE_RESPONSE_FORMAT
  );
}
