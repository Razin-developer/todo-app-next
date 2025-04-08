'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import TodoPage from '@/components/TodoPage';

const Page = () => {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="p-6">
       <TodoPage id={id} /> 
    </div>
  );
};

export default Page;
