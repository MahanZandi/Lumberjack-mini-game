import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, ArrowLeft, User } from 'lucide-react';
import { getTopScores } from '@/lib/storage';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSkin, skins, SkinType } from '@/contexts/SkinContext';

const Dashboard = () => {
  const scores = getTopScores(20);
  const { t } = useLanguage();
  const { selectedSkin, setSelectedSkin } = useSkin();

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-5 h-5 text-accent" />;
    return <span className="w-5 text-center font-bold text-muted-foreground">{index + 1}</span>;
  };

  const getSkinPreview = (skin: SkinType) => {
    const colors = skins[skin];
    return (
      <div className="relative w-20 h-24 mx-auto">
        <div
          className="absolute top-8 left-1/2 -translate-x-1/2 w-10 h-12 rounded"
          style={{ backgroundColor: colors.body }}
        />
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full"
          style={{ backgroundColor: colors.head }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-3 rounded"
          style={{ backgroundColor: colors.hat }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-sky-start to-game-sky-end p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-primary drop-shadow-lg">
            {t.records}
          </h1>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 w-4 h-4" />
              {t.backToGame}
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Trophy className="w-6 h-6 text-accent" />
                {t.topLumberjacks}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {scores.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  {t.noScores}
                </p>
              ) : (
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {scores.map((score, index) => (
                    <div
                      key={score.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {getRankIcon(index)}
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{score.player_name}</span>
                      </div>
                      <span className="font-bold text-primary">{score.score}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {t.selectSkin}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {(Object.keys(skins) as SkinType[]).map((skin) => (
                  <button
                    key={skin}
                    onClick={() => setSelectedSkin(skin)}
                    className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                      selectedSkin === skin
                        ? 'border-primary bg-primary/10'
                        : 'border-muted bg-card'
                    }`}
                  >
                    {getSkinPreview(skin)}
                    <p className="text-center mt-2 font-medium capitalize">
                      {t[skin as keyof typeof t] || skin}
                    </p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
