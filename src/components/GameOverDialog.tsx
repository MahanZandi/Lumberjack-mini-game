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

interface GameOverDialogProps {
  open: boolean;
  score: number;
  onRestart: () => void;
  onSaveScore: (playerName: string) => Promise<void>;
}

export const GameOverDialog = ({ open, score, onRestart, onSaveScore }: GameOverDialogProps) => {
  const [playerName, setPlayerName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!playerName.trim()) {
      toast.error('Please enter your name');
      return;
    }

    setIsSaving(true);
    try {
      await onSaveScore(playerName.trim());
      toast.success('Score saved to leaderboard!');
      setPlayerName('');
      onRestart();
    } catch (error) {
      toast.error('Failed to save score');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-destructive">Game Over!</DialogTitle>
          <DialogDescription className="text-lg">
            You chopped <span className="font-bold text-primary">{score}</span> pieces of wood!
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="playerName">Enter your name for the leaderboard</Label>
            <Input
              id="playerName"
              placeholder="Your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSave()}
              maxLength={50}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={isSaving} className="flex-1">
              {isSaving ? 'Saving...' : 'Save & Restart'}
            </Button>
            <Button onClick={onRestart} variant="outline" className="flex-1">
              Restart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
