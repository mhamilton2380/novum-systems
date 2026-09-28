"use client";

import { useRef, useState } from "react";

// Explainer video under the hero. Shows the poster and a play button; the file only downloads once someone presses play.
export function ExplainerVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    setPlaying(true);
    ref.current?.play();
  };

  return (
    <div className="h-video-frame">
      <video
        ref={ref}
        src="/novum-explainer.mp4"
        poster="/novum-explainer-poster.jpg"
        preload="none"
        playsInline
        controls={playing}
        onPlay={() => setPlaying(true)}
      >
        Your browser does not support the video tag.
      </video>
      {!playing && (
        <button type="button" className="h-video-play" onClick={play} aria-label="Play the Novum overview video">
          <span className="h-video-btn">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
          <span className="h-video-label">Watch the overview</span>
        </button>
      )}
    </div>
  );
}
