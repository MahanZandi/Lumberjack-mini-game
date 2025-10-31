import { useGameLogic } from '@/hooks/useGameLogic';
import { GameCanvas } from '@/components/GameCanvas';
import { GameOverDialog } from '@/components/GameOverDialog';
import { Leaderboard } from '@/components/Leaderboard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Play, Trophy, Palette, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { gameState, initGame, moveTo, chop } = useGameLogic();
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-sky-start to-game-sky-end flex flex-col items-center justify-center p-4 gap-6">
      <header className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 flex-wrap">
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
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary drop-shadow-lg">
          {t.title}
        </h1>
        <p className="text-base sm:text-lg text-foreground/80 px-4">
          {t.subtitle}
        </p>
      </header>

      <main className="flex flex-col lg:flex-row items-start gap-6 w-full max-w-6xl">
        <div className="flex-1 flex flex-col items-center gap-4 w-full">
          {gameState.isPaused ? (
            <div className="w-full max-w-[800px] aspect-[4/3] border-4 border-secondary rounded-lg shadow-2xl bg-gradient-to-b from-game-sky-start to-game-sky-end flex items-center justify-center">
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
            <GameCanvas gameState={gameState} />
          )}

          {!gameState.isPaused && (
            <>
              <div className="bg-card px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg border-4 border-secondary">
                <p className="text-2xl sm:text-3xl font-bold text-primary text-center">
                  {t.score}: {gameState.score}
                </p>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <Button
                  onClick={() => {
                    moveTo('left');
                    chop();
                  }}
                  size="lg"
                  className="text-base sm:text-xl px-4 sm:px-8 py-4 sm:py-6"
                  disabled={gameState.isGameOver}
                >
                  <ArrowLeft className="mr-2" />
                  {t.chopLeft}
                </Button>
                <Button
                  onClick={() => {
                    moveTo('right');
                    chop();
                  }}
                  size="lg"
                  className="text-base sm:text-xl px-4 sm:px-8 py-4 sm:py-6"
                  disabled={gameState.isGameOver}
                >
                  {t.chopRight}
                  <ArrowRight className="ml-2" />
                </Button>
              </div>

              <p className="text-sm text-foreground/70 text-center px-4">
                {t.keyboardTip}
              </p>
            </>
          )}
        </div>

        <aside className="w-full lg:w-auto">
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
