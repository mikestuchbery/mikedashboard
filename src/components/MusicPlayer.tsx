import React from 'react';
import { Music } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        <Music className="w-4 h-4 text-white" />
        <span className="text-sm font-medium text-white">Spotify Player</span>
      </div>

      <div className="min-h-[160px]">
        <div className="flex flex-col gap-4">
          <iframe
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0Ex3M?utm_source=generator"
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl"
          ></iframe>
          <p className="text-[10px] text-white/40 text-center">
            Spotify requires login in a new tab if not working.
          </p>
        </div>
      </div>
    </div>
  );
};
