import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-2 border-primary-200 border-t-primary-600 animate-spin"></div>
        <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-2 border-transparent border-b-accent-600 animate-spin animation-delay-150"></div>
      </div>
    </div>
  );
}