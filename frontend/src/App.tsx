import { useEffect } from 'react';
import { Button } from './components/ui/button';
import { makeQuery } from './api/mistralai';

function App() {
  useEffect(() => {
    makeQuery();
  }, []);

  return (
    <>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <Button>Test Button</Button>
    </>
  );
}

export default App;
