import React from 'react';

export default function Home() {
  return (
    <div className="h-screen bg-bg-primary flex items-center justify-center relative overflow-hidden font-outfit">
      {/* Background Blobs for Glass Visibility */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[20%] w-[30%] h-[30%] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>
    </div>
  );
}
