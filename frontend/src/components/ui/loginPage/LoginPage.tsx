import { DAO } from '@/repositories/DAO';
import LoginForm, { UserCredentials } from './LoginForm';
import { Logo } from './Logo';
import { useNavigate } from 'react-router';
import { useTreeStore } from '@/stores/tree-store';

export function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useTreeStore();

  const onLogin = async (userCredentials: UserCredentials) => {
    const userId = await DAO.getUser(userCredentials.username);
    setUser({ id: userId, username: userCredentials.username });
    navigate('/trees/new');
  };

  return (
    <div className='lg:min-h-screen flex flex-col lg:flex-row'>
      <div className='flex-1 self-center my-20'>
        <Logo />
      </div>
      <div className='flex-1 self-stretch lg:self-center px-8'>
        <LoginForm onSubmit={onLogin} />
      </div>
    </div>
  );
}
