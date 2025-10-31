import { useEffect, useRef } from 'react';
import { GameState } from '@/hooks/useGameLogic';
import { useSkin } from '@/contexts/SkinContext';

interface GameCanvasProps {
  gameState: GameState;
}

export const GameCanvas = ({ gameState }: GameCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { skinColors } = useSkin();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw sky gradient
    const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(1, '#B0D9E8');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height);

    // Draw ground
    ctx.fillStyle = '#8B7355';
    ctx.fillRect(0, height - 80, width, 80);
    ctx.fillStyle = '#6B9B3C';
    ctx.fillRect(0, height - 100, width, 20);

    // Draw tree trunk
    const treeX = width / 2;
    const treeWidth = 80;
    const treeHeight = Math.min(gameState.treeHeight * 8, height - 100);
    
    ctx.fillStyle = '#8B6239';
    ctx.fillRect(treeX - treeWidth / 2, height - 100 - treeHeight, treeWidth, treeHeight);

    // Draw tree texture
    ctx.strokeStyle = '#6B4423';
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
      const y = height - 100 - treeHeight + (treeHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(treeX - treeWidth / 2, y);
      ctx.lineTo(treeX + treeWidth / 2, y);
      ctx.stroke();
    }

    // Draw branches
    gameState.branches.forEach(branch => {
      const branchY = height - 100 - (branch.position * 60) - 60;
      const branchX = branch.side === 'left' 
        ? treeX - treeWidth / 2 - 40
        : treeX + treeWidth / 2 + 40;
      
      if (branchY > 0 && branchY < height - 100) {
        ctx.fillStyle = '#654321';
        ctx.beginPath();
        if (branch.side === 'left') {
          ctx.moveTo(treeX - treeWidth / 2, branchY);
          ctx.lineTo(branchX, branchY - 10);
          ctx.lineTo(branchX, branchY + 10);
        } else {
          ctx.moveTo(treeX + treeWidth / 2, branchY);
          ctx.lineTo(branchX, branchY - 10);
          ctx.lineTo(branchX, branchY + 10);
        }
        ctx.closePath();
        ctx.fill();

        // Draw leaves on branch
        ctx.fillStyle = '#4CAF50';
        ctx.beginPath();
        ctx.arc(branchX, branchY, 15, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw tree top
    ctx.fillStyle = '#4CAF50';
    ctx.beginPath();
    ctx.arc(treeX, height - 100 - treeHeight - 20, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(treeX - 30, height - 100 - treeHeight - 10, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(treeX + 30, height - 100 - treeHeight - 10, 40, 0, Math.PI * 2);
    ctx.fill();

    // Draw player (lumberjack)
    const playerX = gameState.playerSide === 'left' 
      ? treeX - treeWidth / 2 - 80 
      : treeX + treeWidth / 2 + 80;
    const playerY = height - 100 - 60;

    // Player body
    ctx.fillStyle = skinColors.body;
    ctx.fillRect(playerX - 20, playerY, 40, 50);

    // Player head
    ctx.fillStyle = skinColors.head;
    ctx.beginPath();
    ctx.arc(playerX, playerY - 10, 20, 0, Math.PI * 2);
    ctx.fill();

    // Player hat
    ctx.fillStyle = skinColors.hat;
    ctx.fillRect(playerX - 22, playerY - 20, 44, 10);
    ctx.fillRect(playerX - 15, playerY - 30, 30, 10);

    // Player beard
    ctx.fillStyle = skinColors.beard;
    ctx.beginPath();
    ctx.arc(playerX, playerY, 12, 0, Math.PI);
    ctx.fill();

    // Axe
    ctx.strokeStyle = skinColors.axeHandle;
    ctx.lineWidth = 4;
    ctx.beginPath();
    if (gameState.playerSide === 'left') {
      ctx.moveTo(playerX + 20, playerY + 20);
      ctx.lineTo(playerX + 40, playerY);
    } else {
      ctx.moveTo(playerX - 20, playerY + 20);
      ctx.lineTo(playerX - 40, playerY);
    }
    ctx.stroke();

    // Axe head
    ctx.fillStyle = skinColors.axeHead;
    if (gameState.playerSide === 'left') {
      ctx.fillRect(playerX + 38, playerY - 8, 15, 16);
    } else {
      ctx.fillRect(playerX - 53, playerY - 8, 15, 16);
    }

  }, [gameState, skinColors]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="border-4 border-secondary rounded-lg shadow-2xl max-w-full"
    />
  );
};
