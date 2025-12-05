import { useGameLogic } from '@/hooks/useGameLogic';
import { GameCanvas } from '@/components/GameCanvas';
import { GameOverDialog } from '@/components/GameOverDialog';
import { Leaderboard } from '@/components/Leaderboard';
import { Button } from '@/components/ui/button';
import { Play, Trophy, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { gameState, initGame, moveTo, chop } = useGameLogic();
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-sky-start to-game-sky-end flex flex-col items-center justify-center p-2 sm:p-4 gap-2 sm:gap-6">
      <header className="flex items-center justify-center gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLanguage(language === 'en' ? 'fa' : 'en')}
        >
          <Languages className="w-4 h-4 mr-2" />
          {language === 'en' ? 'فارسی' : 'English'}
        </Button>
        <Link to="/dashboard">
          <Button variant="outline" size="sm">
            <Trophy className="w-4 h-4 mr-2" />
            {t.records}
          </Button>
        </Link>
      </header>

      <main className="flex flex-col lg:flex-row items-start gap-2 sm:gap-6 w-full lg:max-w-6xl flex-1">
        <div className="flex-1 flex flex-col items-center gap-2 sm:gap-4 w-full">
          {gameState.isPaused ? (
            <div className="w-full min-h-[95vh] sm:min-h-0 sm:aspect-[4/3] sm:max-w-[800px] border-4 border-secondary rounded-lg shadow-2xl bg-gradient-to-b from-game-sky-start to-game-sky-end flex items-center justify-center">
              <div className="text-center space-y-4 p-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">{t.readyToChop}</h2>
                <p className="text-lg sm:text-xl text-foreground/80">{t.avoidBranches}</p>
                <Button onClick={initGame} size="lg" className="text-lg sm:text-xl px-6 sm:px-8 py-4 sm:py-6">
                  <Play className="mr-2" />
                  {t.startGame}
                </Button>
              </div>
            </div>
          ) : (
            <div 
              className="relative w-full min-h-[95vh] sm:min-h-0 sm:aspect-[4/3] sm:max-w-[800px] cursor-pointer"
              onClick={(e) => {
                if (gameState.isGameOver) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const isLeftSide = x < rect.width / 2;
                moveTo(isLeftSide ? 'left' : 'right');
                chop();
              }}
            >
              <GameCanvas gameState={gameState} />
            </div>
          )}

          {!gameState.isPaused && (
            <div className="text-center space-y-1">
              <div className="bg-card px-6 sm:px-8 py-2 sm:py-4 rounded-xl shadow-lg border-4 border-secondary">
                <p className="text-xl sm:text-3xl font-bold text-primary">
                  {t.score}: {gameState.score}
                </p>
              </div>
              <p className="text-xs sm:text-sm text-foreground/70 px-4">
                {t.tapToPlay}
              </p>
            </div>
          )}
        </div>

        <aside className="w-full lg:w-auto hidden lg:block">
          <Leaderboard />
        </aside>
      </main>

      <GameOverDialog
        open={gameState.isGameOver}
        score={gameState.score}
        onRestart={initGame}
      />
    </div>
  );
};

export default Index;
