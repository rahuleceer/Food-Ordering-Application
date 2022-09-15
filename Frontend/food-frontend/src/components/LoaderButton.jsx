import { Button } from '@mantine/core';
import { useState } from 'react';
import { Loader } from '@mantine/core';
export default function LoaderButton({ onClick, children }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await onClick();
    setLoading(false);
  };

  return (
    <Button
      onClick={handleClick}
      style={{
        minWidth: '200px',
      }}
    >
      {loading ? <Loader color='white' variant='dots' /> : children}
    </Button>
  );
}
