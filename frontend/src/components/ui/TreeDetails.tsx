import { useTreeStore } from '@/stores/tree-store';
import { useMemo } from 'react';
import { useParams } from 'react-router';

export function TreeDetails() {
  const tree = useTree();

  return (
    <div className=' absolute top-0 left-0 right-0 bottom-0 overflow-y-scroll'>
      <div className='p-6 mt-10'>
        <h1 className='font-bold text-xl'>{tree?.title}</h1>
        <p
          className='mt-2'
          dangerouslySetInnerHTML={{ __html: tree?.content ?? '' }}
        ></p>
      </div>
    </div>
  );
}

function useTree() {
  const { treeId } = useParams();

  const { treeDescriptions } = useTreeStore();

  const tree = useMemo(
    () => treeDescriptions.find((t) => t.id.toString() === treeId),
    [treeId, treeDescriptions]
  );

  return tree ?? null;
}
