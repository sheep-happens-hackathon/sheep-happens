import { SendHorizontal } from 'lucide-react';
import { Button } from '../button';
import { Textarea } from '../textarea';
import { useState } from 'react';
import { summarizeBaseNote } from '@/api/ai/queries';
import { DAO } from '@/repositories/DAO';
import { useTreeStore } from '@/stores/tree-store';
import { Node } from '@/types/types';
import { useNavigate } from 'react-router';

export function NewTreePage() {
  const [content, setContent] = useState('');

  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addTreeDescription } = useTreeStore();
  const navigate = useNavigate();

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const baseNote = content;
    setIsLoading(true);
    setPrompt(content);
    setContent('');
    const response = await summarizeBaseNote(baseNote);
    const newTreeId = await DAO.createTree(1, response);
    const tree = {
      id: newTreeId,
      title: response.title,
      content: baseNote,
    };
    addTreeDescription(tree);
    const newNode: Omit<Node, 'id'> = {
      parentId: null,
      title: response.title,
      content: response.content,
      isFinal: false,
    };
    await DAO.createNode(newNode);
    navigate(`/trees/${newTreeId}`);
  };

  return (
    <div className='h-screen flex flex-col'>
      <div className='flex-1  relative'>
        <div className='absolute top-0 left-0 right-0 bottom-0  overflow-y-scroll'>
          <div className='max-w-[800px] p-4 mx-auto'>
            <div dangerouslySetInnerHTML={{ __html: prompt }}></div>
            <br></br>
            <br></br>
            {isLoading ? (
              <h4 className='text-xl'>Twoja notatka jest przetwarzana...</h4>
            ) : null}
          </div>
        </div>
      </div>
      <div className='self-stretch'>
        <div className='max-w-[800px] p-4 mx-auto '>
          <div className='flex gap-2'>
            <Textarea
              disabled={isLoading}
              placeholder='Wklej swoje notatki tutaj...'
              className='resize-none min-h-[0px]'
              rows={1}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleEnter}
            />
            <Button
              disabled={isLoading}
              variant='default'
              size='icon'
              className='w-[50px] bg-green-500 hover:bg-green-400'
              onClick={handleSubmit}
            >
              <SendHorizontal />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
