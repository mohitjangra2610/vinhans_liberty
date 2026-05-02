'use client';

import { useRouter } from 'next/navigation';

export default function QuoteButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/quote');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="px-6 py-3 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition duration-300 w-full md:w-auto"
    >
      Get Free Quote
    </button>
  );
}