import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface GameOverDialogProps {
  open: boolean;
  daysSurvived: number;
  message: string;
  onRestart: () => void;
}

export function GameOverDialog({ open, daysSurvived, message, onRestart }: GameOverDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-headline text-3xl text-center text-destructive">Game Over</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-lg">
            {message}
            <br />
            You survived for <span className="font-bold text-accent">{daysSurvived}</span> days.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onRestart} className="w-full font-headline">
            Try Again
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
