import { Routes, Route, Navigate } from 'react-router';
import App from './App';
import { LoginPage } from './components/ui/loginPage/LoginPage';

export function MainRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to='/login' />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/trees' element={<App />} />
    </Routes>
  );
}
