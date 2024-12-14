import { Routes, Route, Navigate } from 'react-router';
import { LoginPage } from './components/ui/loginPage/LoginPage';
import { NewTreePage } from './components/ui/newTreePage/NewTreePage';
import { TreePageWrapper } from './components/ui/treePageWrapper/TreePageWrapper';
import { TreeDetails } from './components/ui/treeDetails/TreeDetails';
import { NodePreview } from './components/ui/nodePreview/NodePreview';
import { TreeSliderWrapper } from './components/ui/treeSliderWrapper/TreeSliderWrapper';

export function MainRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to='login' />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='trees' element={<TreeSliderWrapper />}>
        <Route path='new' element={<NewTreePage />} />
        <Route path=':treeId' element={<TreePageWrapper />}>
          <Route index element={<TreeDetails />} />
          <Route path='nodes/:nodeId' element={<NodePreview />} />
        </Route>
      </Route>
    </Routes>
  );
}
