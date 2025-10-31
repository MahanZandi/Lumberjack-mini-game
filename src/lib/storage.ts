export interface StoredScore {
  id: number;
  player_name: string;
  score: number;
  created_at: string;
}

const STORAGE_KEY = 'lumberjack_scores';

export const saveScore = (playerName: string, score: number): void => {
  const scores = getScores();
  const newScore: StoredScore = {
    id: Date.now(),
    player_name: playerName,
    score,
    created_at: new Date().toISOString(),
  };
  scores.push(newScore);
  scores.sort((a, b) => b.score - a.score);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
};

export const getScores = (): StoredScore[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getTopScores = (limit: number = 10): StoredScore[] => {
  return getScores().slice(0, limit);
};
