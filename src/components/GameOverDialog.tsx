import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { saveScore } from '@/lib/storage';

interface GameOverDialogProps {
  open: boolean;
  score: number;
  onRestart: () => void;
}

export const GameOverDialog = ({ open, score, onRestart }: GameOverDialogProps) => {
  const { t } = useLanguage();

  useEffect(() => {
    if (open && score > 0) {
      saveScore('بازیکن', score);
    }
  }, [open, score]);

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-destructive">{t.gameOver}</DialogTitle>
          <DialogDescription className="text-lg">
            {t.youChopped} <span className="font-bold text-primary">{score}</span> {t.piecesOfWood}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Button onClick={onRestart} className="w-full">
            {t.restart}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
