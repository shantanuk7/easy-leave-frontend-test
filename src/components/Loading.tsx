import { Loader } from 'lucide-react';
import React from 'react';

function Loading() : React.JSX.Element {
  return (
    <div className='text-center w-full flex flex-col justify-center items-center'>
      <Loader />
      <p className="ml-2">Loading...</p>
    </div>
  )
}

export default Loading;