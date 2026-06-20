'use client';

import { useRef, useState } from 'react';

type RoomVideoPlayerProps = {
  poster: string;
  posterAlt: string;
  label: string;
  sources: readonly string[];
};

export default function RoomVideoPlayer({
  poster,
  posterAlt,
  label,
  sources,
}: RoomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeSrc = sources[activeIndex];

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    setIsPlaying(true);
    void video.play();
  };

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    setIsPlaying(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.load();
    }
  };

  return (
    <div className="room-media relative aspect-[16/10] bg-[#EDE8E0]">
      <video
        ref={videoRef}
        key={activeSrc}
        className={`absolute inset-0 h-full w-full object-cover ${isPlaying ? 'z-10' : 'z-0 opacity-0 pointer-events-none'}`}
        poster={poster}
        controls={isPlaying}
        playsInline
        preload="none"
        onEnded={() => setIsPlaying(false)}
      >
        <source src={activeSrc} type="video/mp4" />
      </video>

      {!isPlaying && (
        <button
          type="button"
          onClick={handlePlay}
          className="group absolute inset-0 z-20 block h-full w-full cursor-pointer border-0 bg-transparent p-0"
          aria-label={`播放${label}`}
        >
          <img
            src={poster}
            alt={posterAlt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#3F3A36] shadow-lg transition-transform group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-current" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="rounded-full bg-black/45 px-3 py-1 text-xs tracking-wider text-white backdrop-blur-sm">
              觀看{label}
            </span>
          </div>
        </button>
      )}

      {sources.length > 1 && (
        <div className="absolute bottom-3 left-3 right-3 z-30 flex gap-2">
          {sources.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => handleSelect(index)}
              className={`flex-1 rounded-full px-3 py-1 text-[10px] tracking-wider transition-colors ${
                index === activeIndex
                  ? 'bg-white text-[#3F3A36] shadow'
                  : 'bg-black/45 text-white backdrop-blur-sm hover:bg-black/60'
              }`}
            >
              實景 {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}