import { getAiSecret } from '@/lib/utils';

export async function makeQuery() {
  const secret = getAiSecret();
  const url =
    'https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1/v1/chat/completions';
  const body = {
    model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
    messages: [
      {
        role: 'user',
        content: 'What is the capital of France?',
      },
    ],
    max_tokens: 500,
    stream: false,
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  console.log('response', data);
}

// curl '' \
// -H 'Authorization: Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' \
// -H 'Content-Type: application/json' \
// --data '{
//     "model": "mistralai/Mixtral-8x7B-Instruct-v0.1",
//     "messages": [
// 		{
// 			"role": "user",
// 			"content": "What is the capital of France?"
// 		}
// 	],
//     "max_tokens": 500,
//     "stream": false
// }'
