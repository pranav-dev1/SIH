import React, { useEffect, useRef, useState } from 'react';
import { Play, Video } from 'lucide-react';

const LessonVideoPlayer = ({ video, lessonTitle }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const title = video?.title || lessonTitle || 'Lesson video';

  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [video?.url]);

  const handlePlayClick = () => {
    setIsPlaying(true);
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => {
      setIsPlaying(false);
    });
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl shadow-lg overflow-hidden">
      <div className="relative aspect-video bg-black">
        <video
          key={video?.url}
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={video?.url}
          controls={isPlaying}
          playsInline
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={(e) => {
            if (e.currentTarget.currentTime === 0) setIsPlaying(false);
          }}
        />

        {!isPlaying && (
          <button
            type="button"
            onClick={handlePlayClick}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center group bg-slate-950/55 hover:bg-slate-950/40 transition"
          >
            <span className="w-16 h-16 rounded-full bg-brand-600/90 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition">
              <Play className="w-8 h-8 fill-current ml-1" />
            </span>
            <span className="px-6">
              <span className="block font-bold text-base text-white">{title}</span>
              <span className="block text-xs text-slate-300 mt-1">Click to play this lesson video</span>
            </span>
          </button>
        )}
      </div>
      <div className="flex items-center gap-2 px-4 py-3 text-xs text-brand-200 font-semibold border-t border-slate-800">
        <Video className="w-4 h-4" />
        <span>{lessonTitle || title}</span>
      </div>
    </div>
  );
};

export default LessonVideoPlayer;
