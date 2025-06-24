"use client";

import React from "react";
import { Button } from "./Button";
import { MusicCategory } from "@/data/musicData";
import { Music, Star, Trophy, Volume2 } from "lucide-react";

interface CategorySelectorProps {
  categories: MusicCategory[];
  onSelectCategory: (category: MusicCategory) => void;
}

const getDifficultyIcon = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return <Star className="w-5 h-5 text-green-400" />;
    case "medium":
      return <Trophy className="w-5 h-5 text-yellow-400" />;
    case "hard":
      return <Volume2 className="w-5 h-5 text-red-400" />;
    default:
      return <Music className="w-5 h-5" />;
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "border-green-400/30 hover:border-green-400/60";
    case "medium":
      return "border-yellow-400/30 hover:border-yellow-400/60";
    case "hard":
      return "border-red-400/30 hover:border-red-400/60";
    default:
      return "border-white/30 hover:border-white/60";
  }
};

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  onSelectCategory,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((category) => (
        <div
          key={category.id}
          className={`relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border-2 transition-all duration-300 cursor-pointer hover:bg-white/10 ${getDifficultyColor(
            category.difficulty
          )}`}
          onClick={() => onSelectCategory(category)}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {getDifficultyIcon(category.difficulty)}
              <h3 className="text-xl font-bold text-white">{category.name}</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/60 capitalize">
                {category.difficulty}
              </span>
              <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                {category.songs.length} songs
              </span>
            </div>
          </div>
          
          <p className="text-white/80 text-sm mb-4 line-clamp-2">
            {category.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-white/60" />
              <span className="text-white/60 text-sm">
                {category.songs.length} tracks
              </span>
            </div>
            <Button
              size="sm"
              onClick={(e) => {
                e?.stopPropagation();
                onSelectCategory(category);
              }}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30"
            >
              Play Category
            </Button>
          </div>
          
          {/* Preview of song titles */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-white/60 text-xs mb-2">Featured tracks:</p>
            <div className="flex flex-wrap gap-1">
              {category.songs.slice(0, 3).map((song, index) => (
                <span
                  key={song.id}
                  className="text-white/50 text-xs bg-white/5 px-2 py-1 rounded"
                >
                  {song.title}
                  {index < Math.min(category.songs.length, 3) - 1 && ","}
                </span>
              ))}
              {category.songs.length > 3 && (
                <span className="text-white/50 text-xs">
                  +{category.songs.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};