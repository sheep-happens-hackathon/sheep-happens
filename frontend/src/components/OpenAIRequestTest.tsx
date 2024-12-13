import { NodeResponse } from '@/api/ai/options';
import { summerizeNote } from '@/api/ai/queries';
import { useState, useEffect } from 'react';

export function OpenAIRequestTest() {
  const [note, setNote] = useState<NodeResponse | null>(null);
  useEffect(() => {
    summerizeNote().then(setNote);
  }, []);

  return (
    <div className='p-28'>
      <h1 className='h1 text-4xl font-extrabold mb-8'>{note?.title}</h1>
      <pre style={{ width: 800, textWrap: 'wrap' }}>{note?.content}</pre>
    </div>
  );
}
