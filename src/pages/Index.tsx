import { useGameLogic } from '@/hooks/useGameLogic';
import { GameCanvas } from '@/components/GameCanvas';
import { GameOverDialog } from '@/components/GameOverDialog';
import { Leaderboard } from '@/components/Leaderboard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';

const Index = () => {
  const { gameState, initGame, switchSide, chop } = useGameLogic();

  const handleSaveScore = async (playerName: string) => {
    // We'll implement this once Lovable Cloud is enabled
    console.log('Saving score:', { playerName, score: gameState.score });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-sky-start to-game-sky-end flex flex-col items-center justify-center p-4 gap-6">
      <header className="text-center">
        <h1 className="text-5xl font-bold text-primary mb-2 drop-shadow-lg">
          🪓 Lumberjack - Chop Wood
        </h1>
        <p className="text-lg text-foreground/80">
          Use arrow keys or tap the buttons to switch sides and chop!
        </p>
      </header>

      <main className="flex flex-col lg:flex-row items-start gap-6 w-full max-w-6xl">
        <div className="flex-1 flex flex-col items-center gap-4">
          {gameState.isPaused ? (
            <div className="w-[800px] max-w-full h-[600px] border-4 border-secondary rounded-lg shadow-2xl bg-gradient-to-b from-game-sky-start to-game-sky-end flex items-center justify-center">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold text-primary">Ready to Chop?</h2>
                <p className="text-xl text-foreground/80">Avoid the branches!</p>
                <Button onClick={initGame} size="lg" className="text-xl px-8 py-6">
                  <Play className="mr-2" />
                  Start Game
                </Button>
              </div>
            </div>
          ) : (
            <GameCanvas gameState={gameState} />
          )}

          {!gameState.isPaused && (
            <>
              <div className="bg-card px-8 py-4 rounded-xl shadow-lg border-4 border-secondary">
                <p className="text-3xl font-bold text-primary text-center">
                  Score: {gameState.score}
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    switchSide();
                    chop();
                  }}
                  size="lg"
                  className="text-xl px-8 py-6"
                  disabled={gameState.isGameOver}
                >
                  <ArrowLeft className="mr-2" />
                  Chop Left
                </Button>
                <Button
                  onClick={() => {
                    switchSide();
                    chop();
                  }}
                  size="lg"
                  className="text-xl px-8 py-6"
                  disabled={gameState.isGameOver}
                >
                  Chop Right
                  <ArrowRight className="ml-2" />
                </Button>
              </div>

              <p className="text-sm text-foreground/70 text-center">
                Tip: Press arrow keys on keyboard for faster gameplay!
              </p>
            </>
          )}
        </div>

        <aside>
          <Leaderboard />
        </aside>
      </main>

      <GameOverDialog
        open={gameState.isGameOver}
        score={gameState.score}
        onRestart={initGame}
        onSaveScore={handleSaveScore}
      />
    </div>
  );
};

export default Index;
