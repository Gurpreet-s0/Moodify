import { useEffect, useRef, useState } from "react";

const formatTime = (time) => {
  if (!Number.isFinite(time)) return "0:00";

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const SongPlayer = ({ song, loading }) => {
  return (
    <SongPlayerControls
      key={song?.songUrl || "empty-player"}
      loading={loading}
      song={song}
    />
  );
};

const SongPlayerControls = ({ song, loading }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !song?.songUrl) return;

    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (event) => {
    const nextTime = Number(event.target.value);
    setCurrentTime(nextTime);

    if (audioRef.current) {
      audioRef.current.currentTime = nextTime;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-8px_30px_rgba(15,23,42,0.12)] backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
            {song?.posterUrl ? (
              <img
                className="h-full w-full object-cover"
                src={song.posterUrl}
                alt={song.title || "Song poster"}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                Music
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {loading ? "Loading song..." : song?.title || "No song selected"}
            </p>
            <p className="text-xs text-slate-500">
              {song?.mood ? `${song.mood} mood` : "Moodify player"}
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-3">
            <button
              className="h-10 rounded-md bg-slate-900 px-5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-300"
              disabled={!song?.songUrl || loading}
              onClick={togglePlay}
              type="button"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>

            <span className="w-10 text-right text-xs text-slate-500">
              {formatTime(currentTime)}
            </span>

            <input
              className="h-2 flex-1 cursor-pointer accent-slate-900 disabled:cursor-not-allowed"
              disabled={!duration}
              max={duration || 0}
              min="0"
              onChange={handleSeek}
              type="range"
              value={currentTime}
            />

            <span className="w-10 text-xs text-slate-500">
              {formatTime(duration)}
            </span>
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-500">
            Volume
            <input
              className="w-28 accent-slate-900"
              max="1"
              min="0"
              onChange={(event) => setVolume(Number(event.target.value))}
              step="0.01"
              type="range"
              value={volume}
            />
          </label>
        </div>

        <audio
          autoPlay
          loop
          onEnded={() => setIsPlaying(false)}
          onLoadedMetadata={(event) =>
            setDuration(event.currentTarget.duration)
          }
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onTimeUpdate={(event) =>
            setCurrentTime(event.currentTarget.currentTime)
          }
          preload="metadata"
          ref={audioRef}
          src={song?.songUrl || ""}
        />
      </div>
    </div>
  );
};

export default SongPlayer;
