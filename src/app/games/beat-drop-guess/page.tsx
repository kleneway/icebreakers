"use client";

import React, { useState } from "react";
import { Button } from "@/components/Button";
import { CategorySelector } from "@/components/CategorySelector";
import { MusicPlayer } from "@/components/MusicPlayer";
import { ScoreBoard } from "@/components/ScoreBoard";
import { GuessInput } from "@/components/GuessInput";
import { musicCategories, type MusicCategory } from "@/data/musicData";
import { ArrowLeft, Play, Pause, SkipForward, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function BeatDropGuessPage() {
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'finished'>('setup');
  const [selectedCategory, setSelectedCategory] = useState<MusicCategory | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [scores, setScores] = useState<{ [playerName: string]: number }>({});
  const [currentGuess, setCurrentGuess] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const startGame = (category: MusicCategory) => {
    setSelectedCategory(category);
    setGameState('playing');
    setCurrentSongIndex(0);
    setScores({});
    setShowAnswer(false);
  };

  const handleCorrectGuess = (playerName: string, points: number) => {
    setScores(prev => ({
      ...prev,
      [playerName]: (prev[playerName] || 0) + points
    }));
    setShowAnswer(true);
  };

  const nextSong = () => {
    if (selectedCategory && currentSongIndex < selectedCategory.songs.length - 1) {
      setCurrentSongIndex(prev => prev + 1);
      setCurrentGuess("");
      setShowAnswer(false);
      setIsPlaying(false);
    } else {
      setGameState('finished');
    }
  };

  const resetGame = () => {
    setGameState('setup');
    setSelectedCategory(null);
    setCurrentSongIndex(0);
    setScores({});
    setCurrentGuess("");
    setShowAnswer(false);
    setIsPlaying(false);
  };

  const currentSong = selectedCategory?.songs[currentSongIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="secondary" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-white">🎵 Beat Drop Guess</h1>
          </div>
          {gameState === 'playing' && (
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">
                Song {currentSongIndex + 1} of {selectedCategory?.songs.length}
              </span>
              <Button variant="secondary" size="sm" onClick={resetGame}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Game
              </Button>
            </div>
          )}
        </div>

        {/* Game Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Game Area */}
          <div className="lg:col-span-2">
            {gameState === 'setup' && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Choose a Category</h2>
                <CategorySelector 
                  categories={musicCategories}
                  onSelectCategory={startGame}
                />
              </div>
            )}

            {gameState === 'playing' && currentSong && (
              <div className="space-y-6">
                {/* Music Player */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <MusicPlayer
                    song={currentSong}
                    isPlaying={isPlaying}
                    onPlayPause={setIsPlaying}
                    showAnswer={showAnswer}
                  />
                </div>

                {/* Guess Input */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <GuessInput
                    currentGuess={currentGuess}
                    onGuessChange={setCurrentGuess}
                    onSubmitGuess={handleCorrectGuess}
                    correctAnswer={currentSong}
                    disabled={showAnswer}
                  />
                </div>

                {/* Game Controls */}
                <div className="flex justify-center gap-4">
                  {showAnswer && (
                    <Button onClick={nextSong} className="flex items-center gap-2">
                      <SkipForward className="w-4 h-4" />
                      Next Song
                    </Button>
                  )}
                  <Button 
                    variant="secondary" 
                    onClick={() => setShowAnswer(true)}
                    disabled={showAnswer}
                  >
                    Reveal Answer
                  </Button>
                </div>
              </div>
            )}

            {gameState === 'finished' && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-6">🎉 Game Finished!</h2>
                <p className="text-white/80 mb-6">
                  Great job! You've completed all songs in the {selectedCategory?.name} category.
                </p>
                <div className="flex justify-center gap-4">
                  <Button onClick={resetGame}>Play Again</Button>
                  <Link href="/">
                    <Button variant="secondary">Back to Home</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Score Board */}
            {gameState === 'playing' && (
              <ScoreBoard scores={scores} />
            )}

            {/* Game Info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">How to Play</h3>
              <ul className="text-white/80 space-y-2 text-sm">
                <li>• Listen to the song snippet</li>
                <li>• Guess the song title or artist</li>
                <li>• Get points for correct answers</li>
                <li>• Bonus points for exact matches</li>
                <li>• Have fun and compete with friends!</li>
              </ul>
            </div>

            {/* Category Info */}
            {selectedCategory && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">{selectedCategory.name}</h3>
                <p className="text-white/80 text-sm mb-4">{selectedCategory.description}</p>
                <div className="text-white/60 text-xs">
                  Difficulty: {selectedCategory.difficulty}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}