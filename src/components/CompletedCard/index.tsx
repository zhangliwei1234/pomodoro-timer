import { Card, CardContent } from '../ui/card.tsx';

interface Props {
  completedPomodoros: number;
}

const CompletedCard = ({ completedPomodoros }: Props) => {
  return (
    <Card className='rounded-2xl border border-zinc-200 bg-white/50 shadow-lg backdrop-blur-lg transition duration-300 dark:border-zinc-700 dark:bg-zinc-900/30'>
      <CardContent className='p-6 text-center'>
        <p className='text-sm text-zinc-500 dark:text-zinc-400'>番茄完成</p>
        <p className='mt-1 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-3xl font-bold text-transparent'>
          {completedPomodoros} 个
        </p>
      </CardContent>
    </Card>
  );
};

export default CompletedCard;
