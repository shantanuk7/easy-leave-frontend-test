import { Loader2 } from 'lucide-react';
import React from 'react';

function Loading(): React.JSX.Element {
  return (
    <div className="text-center w-full flex flex-col justify-center items-center">
      <Loader2 className="animate-spin text-gray-500" size={34} />
      <p className="ml-2">Loading...</p>
    </div>
  );
}

export default Loading;
