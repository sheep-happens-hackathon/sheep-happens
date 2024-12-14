import { Outlet } from 'react-router';
import { LeftSheet } from '../mainPage/LeftSheet';
import { useEffect } from 'react';
import { useTreeStore } from '@/stores/tree-store';
import { DAO } from '@/repositories/DAO';

export function TreeSliderWrapper() {
  const { setTreeDescriptions } = useTreeStore();

  useEffect(() => {
    DAO.getTrees(1).then(setTreeDescriptions);
  }, [setTreeDescriptions]);

  return (
    <div className='min-h-screen relative'>
      <div className='absolute top-2 left-2 z-10'>
        <LeftSheet />
      </div>
      <Outlet />
    </div>
  );
}
