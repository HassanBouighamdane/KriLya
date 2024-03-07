import React from 'react';

function PostLoading() {
  return (
    <div className="max-w-xl mx-auto">
    <div className="p-4 bg-white border border-primary rounded-md">
    

      <div className="mt-4 bg-gray-200 border border-gray-200 w-full h-64 animate-pulse mb-4"></div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 border border-gray-200 w-16 h-5 animate-pulse"></div>
          <span className="bg-tertiary h-1 w-1 rounded animate-pulse"></span>
          <div className="bg-gray-200 border border-gray-200 w-16 h-5 animate-pulse"></div>
        </div>
        <div className="bg-gray-200 border border-gray-200 w-16 h-5 animate-pulse"></div>
      </div>
    </div>
  </div>
  );
}

export default PostLoading;