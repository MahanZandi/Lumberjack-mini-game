import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { saveScore } from '@/lib/storage';

interface GameOverDialogProps {
  open: boolean;
  score: number;
  onRestart: () => void;
}

export const GameOverDialog = ({ open, score, onRestart }: GameOverDialogProps) => {
  const [playerName, setPlayerName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { t } = useLanguage();

  const handleSave = async () => {
    if (!playerName.trim()) {
      toast.error(t.enterNameError);
      return;
    }

    setIsSaving(true);
    try {
      saveScore(playerName.trim(), score);
      toast.success(t.scoreSaved);
      setPlayerName('');
      onRestart();
    } catch (error) {
      toast.error(t.failedToSave);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-destructive">{t.gameOver}</DialogTitle>
          <DialogDescription className="text-lg">
            {t.youChopped} <span className="font-bold text-primary">{score}</span> {t.piecesOfWood}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="playerName">{t.enterName}</Label>
            <Input
              id="playerName"
              placeholder={t.yourName}
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSave()}
              maxLength={50}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={isSaving} className="flex-1">
              {isSaving ? t.saving : t.saveRestart}
            </Button>
            <Button onClick={onRestart} variant="outline" className="flex-1">
              {t.restart}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
