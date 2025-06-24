"use client";

import React, { useState } from "react";
import { Button } from "./Button";
import { Song, checkGuess } from "@/data/musicData";
import { Send, Check, X, Trophy } from "lucide-react";

interface GuessInputProps {
  currentGuess: string;
  onGuessChange: (guess: string) => void;
  onSubmitGuess: (playerName: string, points: number) => void;
  correctAnswer: Song;
  disabled: boolean;
}

export const GuessInput: React.FC<GuessInputProps> = ({
  currentGuess,
  onGuessChange,
  onSubmitGuess,
  correctAnswer,
  disabled,
}) => {
  const [playerName, setPlayerName] = useState("");
  const [feedback, setFeedback] = useState<{
    message: string;
    points: number;
    type: "success" | "error" | "info";
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentGuess.trim() || !playerName.trim() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    
    const result = checkGuess(currentGuess, correctAnswer);
    
    if (result.isCorrect) {
      setFeedback({
        message: `Correct! ${result.matchType} (+${result.points} points)`,
        points: result.points,
        type: "success"
      });
      onSubmitGuess(playerName, result.points);
    } else {
      setFeedback({
        message: "Not quite right. Keep trying!",
        points: 0,
        type: "error"
      });
    }

    // Clear the guess input
    onGuessChange("");
    
    // Auto-hide feedback after 3 seconds
    setTimeout(() => {
      setFeedback(null);
      setIsSubmitting(false);
    }, 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="space-y-4">
      {/* Player Name Input */}
      {!playerName && (
        <div className="space-y-2">
          <label className="block text-white/80 text-sm font-medium">
            Enter your name to start guessing:
          </label>
          <input
            type="text"
            placeholder="Your name..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            disabled={disabled}
          />
        </div>
      )}

      {/* Guess Input Form */}
      {playerName && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-white/80 text-sm font-medium">
              Your guess, {playerName}:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Song title or artist..."
                value={currentGuess}
                onChange={(e) => onGuessChange(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                disabled={disabled || isSubmitting}
              />
              <Button
                type="submit"
                disabled={!currentGuess.trim() || disabled || isSubmitting}
                className="flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "..." : "Guess"}
              </Button>
            </div>
          </div>

          <div className="text-white/60 text-sm">
            <p>💡 Tip: Try the song title, artist name, or both!</p>
          </div>
        </form>
      )}

      {/* Feedback */}
      {feedback && (
        <div
          className={`p-4 rounded-lg border flex items-center gap-3 ${
            feedback.type === "success"
              ? "bg-green-500/20 border-green-500/50 text-green-200"
              : feedback.type === "error"
              ? "bg-red-500/20 border-red-500/50 text-red-200"
              : "bg-blue-500/20 border-blue-500/50 text-blue-200"
          }`}
        >
          {feedback.type === "success" ? (
            <Check className="w-5 h-5" />
          ) : feedback.type === "error" ? (
            <X className="w-5 h-5" />
          ) : (
            <Trophy className="w-5 h-5" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Scoring Info */}
      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="text-white font-medium mb-2">Scoring:</h4>
        <ul className="text-white/70 text-sm space-y-1">
          <li>• Exact title match: 100 points</li>
          <li>• Artist match: 80 points</li>
          <li>• Partial title match: 60 points</li>
          <li>• Partial artist match: 50 points</li>
        </ul>
      </div>
    </div>
  );
};