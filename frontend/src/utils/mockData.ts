import { RecommendationsResponse } from '../types';

export const GENRES: Record<string, string[]> = {
  movies: ['Action', 'Sci-Fi', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller', 'Mystery'],
  books: ['Fantasy', 'Mystery', 'Sci-Fi', 'Biography', 'History', 'Fiction', 'Thriller', 'Self-Help'],
  music: ['Ambient', 'Electronic', 'Rock', 'Pop', 'Jazz', 'Classical', 'Hip-Hop', 'Lofi'],
  games: ['RPG', 'Action', 'Strategy', 'Puzzle', 'Adventure', 'Indie', 'FPS', 'Platformer'],
};

export const MOODS: Record<string, string[]> = {
  movies: ['Excited', 'Thoughtful', 'Relaxed', 'Scared', 'Melancholic', 'Romantic'],
  books: ['Reflective', 'Adventurous', 'Curious', 'Cozy', 'Suspenseful', 'Inspired'],
  music: ['Energetic', 'Chill', 'Focused', 'Gloomy', 'Uplifted', 'Dreamy'],
  games: ['Challenging', 'Casual', 'Immersive', 'Competitive', 'Social', 'Story-rich'],
};

export const MOCK_DATA: Record<string, RecommendationsResponse> = {
  movies: {
    movies: [
      { title: "Inception", year: 2010, genre: ["Sci-Fi", "Action"], cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"], rating: 8.8, reason: "A mind-bending thriller exploring the layers of dreams, subconscious design, and subconscious heist actions. Highly cerebral and matches a thoughtful mood." },
      { title: "Spirited Away", year: 2001, genre: ["Anime", "Fantasy"], cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"], rating: 8.6, reason: "A magical, cozy masterpiece that matches a relaxed mood. Explores personal growth, spiritual landscapes, and deep visual animation artistry." },
      { title: "Parasite", year: 2019, genre: ["Thriller", "Drama"], cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"], rating: 8.9, reason: "A masterclass in genre-bending tension and social commentary. Fits your search for suspenseful narratives with dramatic depth." },
      { title: "The Grand Budapest Hotel", year: 2014, genre: ["Comedy", "Adventure"], cast: ["Ralph Fiennes", "Tony Revolori", "Saoirse Ronan"], rating: 8.1, reason: "A whimsical, highly stylized comedy-adventure that creates a delightful and thoughtfully detailed aesthetic escape." },
      { title: "Interstellar", year: 2014, genre: ["Sci-Fi", "Drama"], cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"], rating: 8.7, reason: "An epic space exploration drama addressing human connection, gravity, time dilation, and interstellar survival." }
    ]
  },
  books: {
    books: [
      { title: "The Way of Kings", author: "Brandon Sanderson", year: 2010, genre: ["Fantasy", "Epic"], rating: 9.2, reason: "An epic fantasy with rich world-building, focusing on characters struggling with personal honor and systemic collapse." },
      { title: "Project Hail Mary", author: "Andy Weir", year: 2021, genre: ["Sci-Fi", "Adventure"], rating: 8.9, reason: "A lone astronaut must save Earth using science, logic, and a surprising friendship in deep space. Very adventurous and uplifting." },
      { title: "Klara and the Sun", author: "Kazuo Ishiguro", year: 2021, genre: ["Fiction", "Sci-Fi"], rating: 8.1, reason: "Underneath the quiet narrative lies a touching examination of what it means to love, told from the perspective of an Artificial Friend." },
      { title: "The Silent Patient", author: "Alex Michaelides", year: 2019, genre: ["Mystery", "Thriller"], rating: 8.5, reason: "A gripping psychological thriller about a woman's act of violence against her husband and her subsequent refusal to speak." },
      { title: "Babel", author: "R.F. Kuang", year: 2022, genre: ["Fantasy", "Historical"], rating: 8.7, reason: "A dark, academic fantasy addressing translation, colonial power, and magic. Explores deep historical and systemic themes." }
    ]
  },
  music: {
    music: [
      { title: "Resonance", artist: "HOME", year: 2014, genre: ["Synthwave", "Chillwave"], rating: 9.0, reason: "Perfect fit for a focused or relaxed atmosphere. Dynamic retro synths blend into a nostalgic, warm wave of sound." },
      { title: "Intro", artist: "The xx", year: 2009, genre: ["Indie Pop", "Ambient"], rating: 9.3, reason: "A minimalist masterpiece with a driving bassline and airy guitars, matching a thoughtful, focused programming flow." },
      { title: "Weightless", artist: "Marconi Union", year: 2011, genre: ["Ambient", "Drone"], rating: 8.8, reason: "Scientifically designed to reduce anxiety and slow heart rates. Slow, drift-like synth pads and soft acoustic elements." },
      { title: "After Hours", artist: "The Weeknd", year: 2020, genre: ["R&B", "Synth-pop"], rating: 8.7, reason: "A sleek, late-night journey through heartbreak and neon lights, matching an energetic night out vibe." },
      { title: "Midnight City", artist: "M83", year: 2011, genre: ["Dream Pop", "Electronic"], rating: 9.1, reason: "An energetic, dream-like anthem featuring soaring synths, stellar saxophones, and retro aesthetics." }
    ]
  },
  games: {
    games: [
      { title: "Outer Wilds", developer: "Mobius Digital", platforms: ["PC", "PS4", "Xbox One", "Switch"], year: 2019, genre: ["Adventure", "Sci-Fi"], rating: 9.5, reason: "A space exploration mystery about a solar system trapped in an infinite time loop. Matches an immersive and reflective gameplay target." },
      { title: "Hades", developer: "Supergiant Games", platforms: ["PC", "PS5", "Xbox Series X", "Switch"], year: 2020, genre: ["Action", "Roguelike"], rating: 9.4, reason: "An action-packed, beautifully styled narrative roguelike with gorgeous art, deep mythology, and high reply value." },
      { title: "Stardew Valley", developer: "ConcernedApe", platforms: ["PC", "Switch", "PS4", "Xbox One", "iOS"], year: 2016, genre: ["Simulation", "RPG"], rating: 9.2, reason: "A peaceful, cozy farming experience. The ultimate recommendation for a relaxed escape with rich character relationships." },
      { title: "Celeste", developer: "Extremely OK Games", platforms: ["PC", "Switch", "PS4", "Xbox One"], year: 2018, genre: ["Platformer", "Indie"], rating: 9.1, reason: "A tight platformer with a touching story about overcoming personal anxiety. Matches a challenging yet inspired mood." },
      { title: "Disco Elysium", developer: "ZA/UM", platforms: ["PC", "PS5", "Xbox Series X", "Switch"], year: 2019, genre: ["RPG", "Mystery"], rating: 9.6, reason: "An incredibly written detective RPG with no combat. Highly thoughtful, psychological, and politically deep." }
    ]
  }
};

export const generateDynamicMockData = (
  category: string,
  genre: string,
  mood: string,
  itemsCount: number,
  userPrompt: string
): RecommendationsResponse => {
  const defaultData = MOCK_DATA[category][category as keyof RecommendationsResponse] || [];
  
  const customizedList = defaultData.map((item, idx) => {
    const g = genre || 'General';
    const m = mood || 'Inspired';
    let modifiedReason = item.reason;
    
    if (idx === 0) {
      modifiedReason = `Directly matching your custom request for ${m} themes. This is highly recommended because it encapsulates the exact essence of "${userPrompt.slice(0, 45)}...".`;
    } else {
      modifiedReason = `An excellent fit for your ${m} mood and ${g} genre preferences, providing outstanding quality and structural elements that stand out in this category.`;
    }
    
    return {
      ...item,
      reason: modifiedReason
    };
  });

  let resultList = [...customizedList];
  while (resultList.length < itemsCount) {
    const sourceItem = customizedList[resultList.length % customizedList.length];
    resultList.push({
      ...sourceItem,
      title: `${sourceItem.title} II`
    });
  }

  return {
    [category]: resultList.slice(0, itemsCount)
  };
};
