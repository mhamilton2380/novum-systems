"use client";

import { useEffect, useRef, useState } from "react";

// The 15-second reel in the hero. Browsers only autoplay muted video, so it loops silently on load;
// "Sound on" restarts it from the top with audio, then it drops back to the silent loop when it ends.
export function HeroReel() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.muted = true;
    v.play().catch(() => {}); // Low Power Mode and similar block autoplay; the play button covers it
  }, []);

  const play = () => ref.current?.play();

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    if (muted) {
      v.currentTime = 0;
      v.loop = false;
      v.muted = false;
      v.play();
    } else {
      v.muted = true;
      v.loop = true;
    }
    setMuted(!muted);
  };

  const backToSilentLoop = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.loop = true;
    setMuted(true);
    v.play();
  };

  return (
    <div className="h-reel">
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="auto"
        poster="/novum-reel-poster.jpg"
        aria-label="Novum AI in 15 seconds: we teach your team, build the tools, connect your systems, and you own all of it."
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        onEnded={backToSilentLoop}
      >
        <source src="/novum-reel-av1.mp4" type='video/mp4; codecs="av01.0.09M.10"' />
        <source src="/novum-reel.mp4" type="video/mp4" />
      </video>
      {paused && (
        <button type="button" className="h-reel-play" onClick={play} aria-label="Play the reel">
          <span className="h-video-btn">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>
          </span>
        </button>
      )}
      <button type="button" className="h-reel-sound" onClick={toggleSound} aria-pressed={!muted}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 9h4l5-4v14l-5-4H4z" />
          {muted ? <path d="M17 9l5 6M22 9l-5 6" /> : <path d="M17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12" />}
        </svg>
        {muted ? "Sound on" : "Mute"}
      </button>
    </div>
  );
}
