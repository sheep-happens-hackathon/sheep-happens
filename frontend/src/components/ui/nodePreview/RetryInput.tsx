import { XIcon, SendIcon } from 'lucide-react';
import { Button } from '../button';
import { Input } from '../input';
import { useState } from 'react';

interface Props {
  isShown: boolean;
  setIsShown: (isShown: boolean) => void;
  regenerateNote: (text: string) => void;
}

export function RetryInput({ isShown, setIsShown, regenerateNote }: Props) {
  const [text, setText] = useState('');

  return (
    <>
      {isShown ? (
        <div className='m-4 flex flex-row'>
          <Button
            type='submit'
            className='bg-primary hover:bg-secondary'
            onClick={() => setIsShown(false)}
          >
            <XIcon />
          </Button>
          <Input
            type='text'
            placeholder='Co chciałbyś zmienić?'
            className='mx-2'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            type='submit'
            className='bg-primary hover:bg-secondary'
            onClick={() => regenerateNote(text)}
          >
            <SendIcon />
          </Button>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
