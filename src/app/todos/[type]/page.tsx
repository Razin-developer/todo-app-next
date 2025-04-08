'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import TodoCardSingle from '@/components/TodoCardSingle';

const Page = () => {
  const params = useParams();
  const type = params.type as string;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Todos for {type}</h1>
       <TodoCardSingle type={type} /> 
    </div>
  );
};

export default Page;
