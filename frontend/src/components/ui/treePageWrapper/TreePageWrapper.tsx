import { Outlet, useParams } from 'react-router';
import { useEffect } from 'react';
import { DAO } from '@/repositories/DAO';
import { useTreeStore } from '@/stores/tree-store';
import { Graph } from '../mainPage/graph/Graph';

export function TreePageWrapper() {
  const { treeId } = useParams();
  const { setNodes } = useTreeStore();

  useEffect(() => {
    DAO.getNodes(parseInt(treeId as string)).then(setNodes);
  }, [treeId, setNodes]);

  return (
    <div className='flex min-h-screen'>
      <div className='flex-1 relative'>
        <Outlet />
      </div>
      <div className='flex-1'>{<Graph />}</div>
    </div>
  );
}
