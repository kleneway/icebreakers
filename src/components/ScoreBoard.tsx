"use client";

import React from "react";
import { Trophy, Medal, Award, Crown } from "lucide-react";

interface ScoreBoardProps {
  scores: { [playerName: string]: number };
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores }) => {
  const sortedPlayers = Object.entries(scores)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .slice(0, 10); // Show top 10 players

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-5 h-5 text-yellow-400" />;
      case 1:
        return <Trophy className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <Award className="w-4 h-4 text-white/60" />;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return "bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border-yellow-400/50";
      case 1:
        return "bg-gradient-to-r from-gray-300/20 to-gray-500/20 border-gray-400/50";
      case 2:
        return "bg-gradient-to-r from-amber-500/20 to-amber-700/20 border-amber-600/50";
      default:
        return "bg-white/5 border-white/20";
    }
  };

  if (sortedPlayers.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-white/60" />
          <h3 className="text-xl font-bold text-white">Scoreboard</h3>
        </div>
        <div className="text-center py-8">
          <Trophy className="w-12 h-12 text-white/40 mx-auto mb-4" />
          <p className="text-white/60">No scores yet!</p>
          <p className="text-white/40 text-sm mt-2">
            Start guessing to see your scores here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-5 h-5 text-white/60" />
        <h3 className="text-xl font-bold text-white">Scoreboard</h3>
      </div>
      
      <div className="space-y-3">
        {sortedPlayers.map(([playerName, score], index) => (
          <div
            key={playerName}
            className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${getRankColor(
              index
            )}`}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8">
                {getRankIcon(index)}
              </div>
              <div>
                <p className="font-medium text-white">
                  {playerName || `Player ${index + 1}`}
                </p>
                <p className="text-white/60 text-sm">
                  Rank #{index + 1}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-white">{score}</p>
              <p className="text-white/60 text-sm">points</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add player button */}
      <div className="mt-6 pt-4 border-t border-white/20">
        <button
          onClick={() => {
            const playerName = prompt("Enter player name:");
            if (playerName) {
              // This would typically be handled by the parent component
              console.log("Add player:", playerName);
            }
          }}
          className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200 text-sm"
        >
          + Add Player
        </button>
      </div>

      {/* Quick stats */}
      <div className="mt-4 pt-4 border-t border-white/20">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-white">{sortedPlayers.length}</p>
            <p className="text-white/60 text-sm">Players</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">
              {Math.max(...sortedPlayers.map(([, score]) => score), 0)}
            </p>
            <p className="text-white/60 text-sm">High Score</p>
          </div>
        </div>
      </div>
    </div>
  );
};