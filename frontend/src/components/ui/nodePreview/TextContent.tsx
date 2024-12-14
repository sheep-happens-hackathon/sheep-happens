import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';
import {
  PlusIcon,
  MinusIcon,
  RotateCcwIcon,
  NetworkIcon,
  LeafIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Highlight {
  start: number;
  end: number;
  id: string;
}

interface Props {
  originalText: string;
  setIsRetryInputShown: (isShown: boolean) => void;
  setSelectedPhrases: (phrases: string[]) => void;
  generate: () => void;
  markAsLeaf: () => void;
}

export function TextContent({
  originalText,
  setIsRetryInputShown,
  setSelectedPhrases,
  generate,
  markAsLeaf,
}: Props) {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [renderedText, setRenderedText] = useState<string>(originalText);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [userSelection, setUserSelection] = useState<Highlight | null>(null);

  useEffect(() => {
    const newPhrases = highlights.map((h) =>
      convertHighlightToPhrase(originalText, h)
    );
    setSelectedPhrases(newPhrases);
  }, [highlights]);

  useEffect(() => {
    setHighlights([]);
    setUserSelection(null);
    setRenderedText(originalText);
    updateRenderedText(highlights);
  }, [originalText]);

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
        updatedText += originalText.slice(lastIndex, highlight.start);
      }
      updatedText +=
        `<span style="background-color: #7D3F9F ;">` +
        originalText.slice(highlight.start, highlight.end) +
        `</span>`;
      lastIndex = highlight.end;
    });

    if (lastIndex < originalText.length) {
      updatedText += originalText.slice(lastIndex);
    }

    setRenderedText(updatedText);
  };

  useEffect(() => {
    updateRenderedText(highlights);
  }, [highlights]);

  return (
    <>
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

      <div
        className='fixed z-20 top-1/2 -translate-y-1/2 flex flex-col justify-self-center self-center ml-3'
        style={{
          right: 'calc(50vw + 16px)',
        }}
      >
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
                onClick={() => setIsRetryInputShown(true)}
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
                onClick={generate}
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
                onClick={markAsLeaf}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Zakończ wątek i stwórz fiszki</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </>
  );
}

function convertHighlightToPhrase(
  fullText: string,
  highlight: Highlight
): string {
  return fullText.slice(highlight.start, highlight.end);
}
