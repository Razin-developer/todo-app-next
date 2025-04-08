import { Loader2 } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <div className='flex items-center justify-center h-screen w-full'>
      <Loader2 className='animate-spin' size={50} color="#3b82f6" />
      <p className='text-gray-600 text-lg font-semibold'>Loading...</p>
    </div>
  )
}

export default loading
