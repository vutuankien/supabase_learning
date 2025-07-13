import React from 'react';

const Loading = () => (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-4"></div>
        <p className="text-center text-blue-700 font-bold text-2xl">Loading...</p>
    </div>
);

export default Loading;
