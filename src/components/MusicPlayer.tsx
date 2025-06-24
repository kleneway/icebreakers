"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "./Button";
import { Song } from "@/data/musicData";
import { Play, Pause, Volume2, VolumeX, Clock, Music } from "lucide-react";

interface MusicPlayerProps {
  song: Song;
  isPlaying: boolean;
  onPlayPause: (playing: boolean) => void;
  showAnswer: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  song,
  isPlaying,
  onPlayPause,
  showAnswer,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getYouTubeVideoId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : "";
  };

  const videoId = getYouTubeVideoId(song.youtubeUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${song.startTime}&end=${song.endTime}&autoplay=0&controls=1&rel=0`;

  useEffect(() => {
    if (isPlaying && !hasEnded) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= song.endTime - song.startTime) {
            setHasEnded(true);
            onPlayPause(false);
            return song.endTime - song.startTime;
          }
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, hasEnded, song.endTime, song.startTime, onPlayPause]);

  useEffect(() => {
    setCurrentTime(0);
    setHasEnded(false);
    setDuration(song.endTime - song.startTime);
  }, [song]);

  const handlePlayPause = () => {
    if (hasEnded) {
      setCurrentTime(0);
      setHasEnded(false);
    }
    onPlayPause(!isPlaying);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Music className="w-5 h-5 text-white/60" />
          <span className="text-white/60 text-sm">Now Playing</span>
        </div>
        {showAnswer ? (
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{song.title}</h3>
            <p className="text-white/80 text-lg">{song.artist}</p>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">🎵 Mystery Song</h3>
            <p className="text-white/80 text-lg">Can you guess this track?</p>
          </div>
        )}
      </div>

      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        {showAnswer ? (
          <iframe
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-purple-900/50 to-blue-900/50">
            <div className="text-center">
              <Music className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <p className="text-white/60">Audio Only - Video revealed with answer!</p>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-white/60">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-400 to-blue-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-6">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsMuted(!isMuted)}
          className="flex items-center gap-2"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          {isMuted ? "Unmute" : "Mute"}
        </Button>

        <Button
          onClick={handlePlayPause}
          className="flex items-center gap-2 px-8 py-3"
          disabled={showAnswer}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {hasEnded ? "Replay" : isPlaying ? "Pause" : "Play"}
        </Button>

        <div className="flex items-center gap-2 text-white/60">
          <Clock className="w-4 h-4" />
          <span className="text-sm">
            {song.endTime - song.startTime}s clip
          </span>
        </div>
      </div>

      {!showAnswer && (
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <p className="text-white/80 text-sm">
            Listen carefully! The song will cut right before the best part. 
            Can you guess the title or artist?
          </p>
        </div>
      )}
    </div>
  );
};