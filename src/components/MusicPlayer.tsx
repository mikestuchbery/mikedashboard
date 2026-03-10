import React, { useState, useRef } from 'react';
import { Music, Radio, ExternalLink, Play, Pause, SkipForward, Volume2 } from 'lucide-react';
import { SOMAFM_CHANNELS } from '../constants';

export const MusicPlayer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'spotify' | 'somafm'>('somafm');
  const [currentSoma, setCurrentSoma] = useState(SOMAFM_CHANNELS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleSoma = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
            setIsPlaying(true);
          }
        }
      } catch (error) {
        console.error("Playback failed:", error);
        setIsPlaying(false);
      }
    }
  };

  const changeSoma = async (channel: typeof SOMAFM_CHANNELS[0]) => {
    setCurrentSoma(channel);
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.src = channel.url;
        audioRef.current.load(); // Explicitly load the new source
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
      } catch (error) {
        console.error("Channel change failed:", error);
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex flex-col gap-4">
      <div className="flex gap-4 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab('spotify')}
          className={`flex items-center gap-2 text-sm font-medium transition-colors ${
            activeTab === 'spotify' ? 'text-white' : 'text-white/40 hover:text-white/60'
          }`}
        >
          <Music className="w-4 h-4" /> Spotify
        </button>
        <button
          onClick={() => setActiveTab('somafm')}
          className={`flex items-center gap-2 text-sm font-medium transition-colors ${
            activeTab === 'somafm' ? 'text-white' : 'text-white/40 hover:text-white/60'
          }`}
        >
          <Radio className="w-4 h-4" /> SomaFM
        </button>
      </div>

      <div className="min-h-[160px]">
        {activeTab === 'spotify' ? (
          <div className="flex flex-col gap-4">
            <iframe
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0Ex7X?utm_source=generator&theme=0"
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
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between bg-black/20 p-4 rounded-2xl border border-white/5">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Now Playing</span>
                <span className="text-white font-medium">{currentSoma.name}</span>
              </div>
              <button
                onClick={toggleSoma}
                className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {SOMAFM_CHANNELS.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => changeSoma(channel)}
                  className={`text-left px-3 py-2 rounded-xl text-xs transition-all border ${
                    currentSoma.id === channel.id
                      ? 'bg-white/20 border-white/30 text-white'
                      : 'bg-white/5 border-transparent text-white/60 hover:bg-white/10'
                  }`}
                >
                  {channel.name}
                </button>
              ))}
            </div>
            <audio 
              ref={audioRef} 
              src={currentSoma.url} 
              onEnded={() => setIsPlaying(false)}
              onError={(e) => {
                console.error("Audio error", e);
                setIsPlaying(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
