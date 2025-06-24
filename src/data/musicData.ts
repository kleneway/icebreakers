export interface Song {
  id: string;
  title: string;
  artist: string;
  youtubeUrl: string;
  startTime: number; // in seconds
  endTime: number; // in seconds
  difficulty: "easy" | "medium" | "hard";
}

export interface MusicCategory {
  id: string;
  name: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  songs: Song[];
}

export const musicCategories: MusicCategory[] = [
  {
    id: "2000s-hits",
    name: "2000s Pop Hits",
    description: "The biggest pop songs from the 2000s that everyone knows",
    difficulty: "easy",
    songs: [
      {
        id: "hey-ya",
        title: "Hey Ya!",
        artist: "OutKast",
        youtubeUrl: "https://www.youtube.com/watch?v=PWgvGjAhvIw",
        startTime: 55,
        endTime: 65,
        difficulty: "easy"
      },
      {
        id: "hips-dont-lie",
        title: "Hips Don't Lie",
        artist: "Shakira ft. Wyclef Jean",
        youtubeUrl: "https://www.youtube.com/watch?v=DUT5rEU6pqM",
        startTime: 48,
        endTime: 58,
        difficulty: "easy"
      },
      {
        id: "crazy",
        title: "Crazy",
        artist: "Gnarls Barkley",
        youtubeUrl: "https://www.youtube.com/watch?v=bd2B6SjMh_w",
        startTime: 32,
        endTime: 42,
        difficulty: "easy"
      },
      {
        id: "sexyback",
        title: "SexyBack",
        artist: "Justin Timberlake",
        youtubeUrl: "https://www.youtube.com/watch?v=3gOHvDP_vCs",
        startTime: 43,
        endTime: 53,
        difficulty: "medium"
      },
      {
        id: "umbrella",
        title: "Umbrella",
        artist: "Rihanna ft. Jay-Z",
        youtubeUrl: "https://www.youtube.com/watch?v=CvBfHwUxHIk",
        startTime: 67,
        endTime: 77,
        difficulty: "easy"
      }
    ]
  },
  {
    id: "viral-tiktok",
    name: "Viral TikTok Songs",
    description: "Songs that went viral on TikTok and social media",
    difficulty: "medium",
    songs: [
      {
        id: "savage",
        title: "Savage",
        artist: "Megan Thee Stallion",
        youtubeUrl: "https://www.youtube.com/watch?v=EOxj2uNdPDk",
        startTime: 45,
        endTime: 55,
        difficulty: "medium"
      },
      {
        id: "renegade",
        title: "Lottery (Renegade)",
        artist: "K Camp",
        youtubeUrl: "https://www.youtube.com/watch?v=nqtonhSoEvU",
        startTime: 12,
        endTime: 22,
        difficulty: "medium"
      },
      {
        id: "drivers-license",
        title: "drivers license",
        artist: "Olivia Rodrigo",
        youtubeUrl: "https://www.youtube.com/watch?v=ZmDBbnmKpqQ",
        startTime: 52,
        endTime: 62,
        difficulty: "easy"
      },
      {
        id: "heat-waves",
        title: "Heat Waves",
        artist: "Glass Animals",
        youtubeUrl: "https://www.youtube.com/watch?v=mRD0-GxqHVo",
        startTime: 37,
        endTime: 47,
        difficulty: "medium"
      }
    ]
  },
  {
    id: "movie-soundtracks",
    name: "Movie Soundtracks",
    description: "Iconic songs from popular movies",
    difficulty: "hard",
    songs: [
      {
        id: "eye-of-tiger",
        title: "Eye of the Tiger",
        artist: "Survivor",
        youtubeUrl: "https://www.youtube.com/watch?v=btPJPFnesV4",
        startTime: 55,
        endTime: 65,
        difficulty: "medium"
      },
      {
        id: "footloose",
        title: "Footloose",
        artist: "Kenny Loggins",
        youtubeUrl: "https://www.youtube.com/watch?v=ltrMfT4Qz5Y",
        startTime: 43,
        endTime: 53,
        difficulty: "medium"
      },
      {
        id: "i-will-survive",
        title: "I Will Survive",
        artist: "Gloria Gaynor",
        youtubeUrl: "https://www.youtube.com/watch?v=ZBR2G-iI3-I",
        startTime: 67,
        endTime: 77,
        difficulty: "hard"
      },
      {
        id: "bohemian-rhapsody",
        title: "Bohemian Rhapsody",
        artist: "Queen",
        youtubeUrl: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
        startTime: 178,
        endTime: 188,
        difficulty: "hard"
      }
    ]
  },
  {
    id: "classic-rock",
    name: "Classic Rock Anthems",
    description: "Legendary rock songs everyone should know",
    difficulty: "medium",
    songs: [
      {
        id: "dont-stop-believin",
        title: "Don't Stop Believin'",
        artist: "Journey",
        youtubeUrl: "https://www.youtube.com/watch?v=1k8craCGpgs",
        startTime: 195,
        endTime: 205,
        difficulty: "easy"
      },
      {
        id: "sweet-child",
        title: "Sweet Child O' Mine",
        artist: "Guns N' Roses",
        youtubeUrl: "https://www.youtube.com/watch?v=1w7OgIMMRc4",
        startTime: 156,
        endTime: 166,
        difficulty: "medium"
      },
      {
        id: "livin-on-prayer",
        title: "Livin' on a Prayer",
        artist: "Bon Jovi",
        youtubeUrl: "https://www.youtube.com/watch?v=lDK9QqIzhwk",
        startTime: 125,
        endTime: 135,
        difficulty: "easy"
      }
    ]
  }
];

// Helper functions
export const getSongById = (categoryId: string, songId: string): Song | undefined => {
  const category = musicCategories.find(cat => cat.id === categoryId);
  return category?.songs.find(song => song.id === songId);
};

export const getCategoryById = (categoryId: string): MusicCategory | undefined => {
  return musicCategories.find(cat => cat.id === categoryId);
};

export const checkGuess = (guess: string, song: Song): { isCorrect: boolean; points: number; matchType: string } => {
  const normalizeString = (str: string) => 
    str.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  const normalizedGuess = normalizeString(guess);
  const normalizedTitle = normalizeString(song.title);
  const normalizedArtist = normalizeString(song.artist);
  
  // Exact title match
  if (normalizedGuess === normalizedTitle) {
    return { isCorrect: true, points: 100, matchType: 'Exact Title Match' };
  }
  
  // Exact artist match
  if (normalizedGuess === normalizedArtist) {
    return { isCorrect: true, points: 80, matchType: 'Artist Match' };
  }
  
  // Partial title match
  if (normalizedTitle.includes(normalizedGuess) || normalizedGuess.includes(normalizedTitle)) {
    return { isCorrect: true, points: 60, matchType: 'Partial Title Match' };
  }
  
  // Partial artist match
  if (normalizedArtist.includes(normalizedGuess) || normalizedGuess.includes(normalizedArtist)) {
    return { isCorrect: true, points: 50, matchType: 'Partial Artist Match' };
  }
  
  return { isCorrect: false, points: 0, matchType: 'No Match' };
};