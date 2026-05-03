'use client';

import { useRouter } from 'next/navigation';
import { Button } from './button';

export default function QuoteButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/quote');
  };

  return (
    <Button
      variant="default"
      size="lg"
      onClick={handleClick}
      className="px-6 py-3 text-white rounded-md hover:bg-blue-700 transition duration-300 w-full md:w-auto"
    >
      Get Free Quote
    </Button>
  );
}