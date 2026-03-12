import React from 'react';

interface ARVideoPlayerProps {
  onComplete: () => void;
}

export default function ARVideoPlayer({ onComplete }: ARVideoPlayerProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-900 min-h-screen">
      
      {/* 这是一个带有粗黑边框和童趣风格的容器 (Neo-Brutalism Style) */}
      <div className="w-full max-w-sm bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        
        {/* 顶部黄色标题栏 */}
        <div className="bg-yellow-400 border-b-4 border-black p-3 text-center">
          <h2 className="text-black font-extrabold text-xl tracking-wide">
            MISSION BRIEFING 🎒
          </h2>
        </div>

        {/* YouTube 视频嵌入区 */}
        <div className="relative w-full aspect-[9/16] bg-black">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/ZT7j0qG8iRY?autoplay=1&loop=1&playlist=ZT7j0qG8iRY&controls=0&modestbranding=1"
            title="AR Safe Zone Tutorial"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

      </div>

      {/* 底部准备就绪按钮 */}
      <button 
        onClick={onComplete}
        className="mt-8 px-8 py-4 bg-green-400 border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all"
      >
        <span className="text-black font-bold text-lg">I'm Ready! Start Scanning 📷</span>
      </button>

    </div>
  );
}