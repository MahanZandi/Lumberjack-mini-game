import { useState, useEffect, useCallback, useRef } from 'react';

export interface Branch {
  id: number;
  side: 'left' | 'right';
  position: number;
}

export interface GameState {
  score: number;
  isGameOver: boolean;
  isPaused: boolean;
  playerSide: 'left' | 'right';
  branches: Branch[];
  chopSpeed: number;
  treeHeight: number;
}

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    isGameOver: false,
    isPaused: true,
    playerSide: 'left',
    branches: [],
    chopSpeed: 1000,
    treeHeight: 100,
  });

  const branchIdCounter = useRef(0);
  const gameLoopRef = useRef<number>();

  const generateBranch = useCallback((): Branch => {
    return {
      id: branchIdCounter.current++,
      side: Math.random() > 0.5 ? 'left' : 'right',
      position: gameState.branches.length,
    };
  }, [gameState.branches.length]);

  const initGame = useCallback(() => {
    const initialBranches: Branch[] = [];
    for (let i = 0; i < 5; i++) {
      initialBranches.push({
        id: branchIdCounter.current++,
        side: Math.random() > 0.5 ? 'left' : 'right',
        position: i + 3,
      });
    }

    setGameState({
      score: 0,
      isGameOver: false,
      isPaused: false,
      playerSide: 'left',
      branches: initialBranches,
      chopSpeed: 1000,
      treeHeight: 100,
    });
  }, []);

  const moveTo = useCallback((side: 'left' | 'right') => {
    if (gameState.isGameOver || gameState.isPaused) return;
    
    setGameState(prev => ({
      ...prev,
      playerSide: side,
    }));
  }, [gameState.isGameOver, gameState.isPaused]);

  const chop = useCallback(() => {
    if (gameState.isGameOver || gameState.isPaused) return;

    setGameState(prev => {
      const lowestBranch = prev.branches.find(b => b.position === 0);
      
      if (lowestBranch && lowestBranch.side === prev.playerSide) {
        return {
          ...prev,
          isGameOver: true,
        };
      }

      const newScore = prev.score + 1;
      const newChopSpeed = Math.max(300, 1000 - Math.floor(newScore / 10) * 100);
      
      const updatedBranches = prev.branches
        .map(b => ({ ...b, position: b.position - 1 }))
        .filter(b => b.position >= 0);

      if (updatedBranches.length < 8) {
        updatedBranches.push({
          id: branchIdCounter.current++,
          side: Math.random() > 0.5 ? 'left' : 'right',
          position: Math.max(...updatedBranches.map(b => b.position), 0) + 1,
        });
      }

      return {
        ...prev,
        score: newScore,
        chopSpeed: newChopSpeed,
        branches: updatedBranches,
        treeHeight: Math.max(20, prev.treeHeight - 1),
      };
    });
  }, [gameState.isGameOver, gameState.isPaused]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        moveTo('left');
        chop();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        moveTo('right');
        chop();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        chop();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [moveTo, chop]);

  return {
    gameState,
    initGame,
    moveTo,
    chop,
  };
};
