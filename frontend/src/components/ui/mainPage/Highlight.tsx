import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { Button } from '../button';
import {
  LeafIcon,
  MinusIcon,
  NetworkIcon,
  PlusIcon,
  RotateCcwIcon,
  SendIcon,
  XIcon,
} from 'lucide-react';
import { Input } from '../input';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';
import { extendNoteFragments } from '@/api/ai/queries';
import { useTreeStore } from '@/stores/tree-store';
import { useParams } from 'react-router';
import { DAO } from '@/repositories/DAO';
import { Node } from '@/types/types';

function convertHighlightToPhrase(
  fullText: string,
  highlight: Highlight
): string {
  return fullText.slice(highlight.start, highlight.end);
}

interface Highlight {
  start: number;
  end: number;
  id: string;
}

interface MultiTextHighlighterProps {
  text: string;
}

export const MultiTextHighlighter: React.FC<MultiTextHighlighterProps> = ({
  text,
}) => {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [userSelection, setUserSelection] = useState<Highlight | null>(null);
  const [renderedText, setRenderedText] = useState<string>(text);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [retryInputShowed, setRetryInputShowed] = useState(false);
  const { addNodes, setNodes } = useTreeStore();
  const { treeId, nodeId } = useParams();

  useEffect(() => {
    setHighlights([]);
    setUserSelection(null);
  }, [text]);

  const generate = useCallback(async () => {
    if (nodeId === undefined) return;
    const phrases = highlights.map((h) => convertHighlightToPhrase(text, h));
    console.log('chat gpt phrases', phrases);
    const response = await extendNoteFragments(text, phrases);
    console.log('chat gpt response', response);
    const treeIdNum = parseInt(treeId!);
    const newNodes: Omit<Node, 'id'>[] = response.map((node) => ({
      title: node.title,
      content: node.content,
      treeId: treeIdNum,
      parentId: parseInt(nodeId!),
      isFinal: false,
    }));
    await DAO.createNode(treeIdNum, newNodes);
    await DAO.getNodes(parseInt(treeId as string)).then(setNodes);
  }, [highlights, text, nodeId, setNodes, treeId]);

  // Function to get the current user selection
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && textContainerRef.current) {
      const range = selection.getRangeAt(0);
      const container = textContainerRef.current;

      // Calculate offsets based on container text content (excluding tags)
      const preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(container);
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
      const startOffset = preSelectionRange.toString().length;
      const endOffset = startOffset + range.toString().length;

      if (startOffset !== endOffset) {
        setUserSelection({
          start: startOffset,
          end: endOffset,
          id: 'user-selection',
        });
      }
    }
  };

  useEffect(() => {
    setHighlights([]);
    setRenderedText(text);
    updateRenderedText(highlights);
  }, [text]);

  useEffect(() => {
    updateRenderedText(highlights);
  }, [highlights]);

  // Add the current user selection to highlights
  const addHighlight = () => {
    if (userSelection) {
      setHighlights((prev) => {
        const newHighlights = [
          ...prev,
          { ...userSelection, id: crypto.randomUUID() },
        ];
        return mergeHighlights(newHighlights);
      });
      setUserSelection(null);
    }
  };

  // Remove overlapping highlights based on user selection
  const removeHighlight = () => {
    if (userSelection) {
      setHighlights((prev) => {
        return prev.filter(
          (highlight) =>
            highlight.end <= userSelection.start ||
            highlight.start >= userSelection.end
        );
      });
      setUserSelection(null);
    }
  };

  // Utility: Merge overlapping or adjacent highlights
  const mergeHighlights = (highlights: Highlight[]): Highlight[] => {
    const sorted = highlights.sort((a, b) => a.start - b.start);
    const merged: Highlight[] = [];

    sorted.forEach((current) => {
      if (!merged.length || merged[merged.length - 1].end < current.start) {
        merged.push(current);
      } else {
        merged[merged.length - 1].end = Math.max(
          merged[merged.length - 1].end,
          current.end
        );
      }
    });

    updateRenderedText(merged);
    return merged;
  };

  // Update rendered text with highlights
  const updateRenderedText = (highlights: Highlight[]) => {
    let updatedText = '';
    let lastIndex = 0;

    highlights.forEach((highlight) => {
      if (lastIndex < highlight.start) {
        updatedText += text.slice(lastIndex, highlight.start);
      }
      updatedText +=
        `<span style="background-color: #7D3F9F ;">` +
        text.slice(highlight.start, highlight.end) +
        `</span>`;
      lastIndex = highlight.end;
    });

    if (lastIndex < text.length) {
      updatedText += text.slice(lastIndex);
    }

    setRenderedText(updatedText);
  };

  return (
    <div className='flex flex-col p-2'>
      <div className='flex flex-row'>
        <div
          ref={textContainerRef}
          onMouseUp={handleMouseUp}
          dangerouslySetInnerHTML={{ __html: renderedText }}
          style={{
            whiteSpace: 'pre-wrap',
            cursor: 'text',
            userSelect: 'text',
          }}
          className='flex-1'
        ></div>
        <div className='flex flex-col justify-self-center self-center ml-3'>
          <div className=' pb-3'>
            <Tooltip>
              <TooltipTrigger asChild>
                <PlusIcon
                  color='#F0B000'
                  cursor={'pointer'}
                  onClick={addHighlight}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Uwzględnij zaznaczony tekst w następnym zapytaniu</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className=' pb-3'>
            <Tooltip>
              <TooltipTrigger asChild>
                <MinusIcon
                  color='#FE4E00'
                  cursor={'pointer'}
                  onClick={removeHighlight}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Usuń zaznaczony tekst z następnego zapytania</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className=' pb-3'>
            <Tooltip>
              <TooltipTrigger asChild>
                <RotateCcwIcon
                  color='#FE4E00'
                  cursor={'pointer'}
                  onClick={() => setRetryInputShowed(true)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Prześlij zapytanie jeszcze raz</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className=' pb-3'>
            <Tooltip>
              <TooltipTrigger asChild>
                <NetworkIcon
                  color='#20A39E'
                  cursor={'pointer'}
                  onClick={() => {
                    console.log('');
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Utwórz kolejne zapytanie na podstawie zaznaczeń</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <LeafIcon
                  color='#20A39E'
                  cursor={'pointer'}
                  onClick={() => {
                    console.log('');
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Zakończ wątek i stwórz fiszki</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      {retryInputShowed && (
        <div className='flex flex-row mt-3'>
          <Button
            type='submit'
            className='bg-primary hover:bg-secondary'
            onClick={() => setRetryInputShowed(false)}
          >
            <XIcon />
          </Button>
          <Input
            type='text'
            placeholder='Co chciałbyś zmienić?'
            className='mx-2'
          />
          <Button type='submit' className='bg-primary hover:bg-secondary'>
            <SendIcon />
          </Button>
        </div>
      )}
    </div>
  );
};
