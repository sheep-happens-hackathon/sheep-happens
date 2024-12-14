import { Routes, Route, Navigate } from 'react-router';
import { LoginPage } from './components/ui/loginPage/LoginPage';
import { TreeDetails } from './components/ui/TreeDetails';
import { NodePreview } from './components/ui/nodePreview/NodePreview';
import { NewTreePage } from './components/ui/NewTreePage';
import { TreePageWrapper } from './components/ui/TreePageWrapper';
import { TreeSliderWrapper } from './components/ui/TreeSliderWrapper';

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
