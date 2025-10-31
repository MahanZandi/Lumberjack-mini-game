import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Medal } from 'lucide-react';
import { getTopScores, StoredScore } from '@/lib/storage';
import { useLanguage } from '@/contexts/LanguageContext';

export const Leaderboard = () => {
  const [scores, setScores] = useState<StoredScore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    setScores(getTopScores());
    setIsLoading(false);
  }, []);

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-5 h-5 text-accent" />;
    if (index === 1) return <Medal className="w-5 h-5 text-muted-foreground" />;
    if (index === 2) return <Medal className="w-5 h-5 text-secondary" />;
    return <span className="w-5 text-center font-bold text-muted-foreground">{index + 1}</span>;
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Trophy className="w-6 h-6 text-accent" />
          {t.topLumberjacks}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-center text-muted-foreground">{t.loading}</p>
        ) : scores.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            {t.noScores}
          </p>
        ) : (
          <div className="space-y-2">
            {scores.map((score, index) => (
              <div
                key={score.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  {getRankIcon(index)}
                  <span className="font-medium">{score.player_name}</span>
                </div>
                <span className="font-bold text-primary">{score.score}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
