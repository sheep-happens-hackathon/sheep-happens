import { Outlet } from 'react-router';
import { useEffect } from 'react';
import { useTreeStore } from '@/stores/tree-store';
import { DAO } from '@/repositories/DAO';
import { LeftSheet } from './LeftSheet';

export function TreeSliderWrapper() {
  const { setTreeDescriptions, user } = useTreeStore();

  useEffect(() => {
    if (user !== null) {
      console.log('getting trees', user);
      DAO.getTrees(user.id).then((data) => {
        console.log('recevied trees', data);
        setTreeDescriptions(data);
      });
    }
  }, [setTreeDescriptions, user]);

  return (
    <div className='min-h-screen relative'>
      <div className='absolute top-2 left-2 z-10'>
        <LeftSheet />
      </div>
      <Outlet />
    </div>
  );
}
