import { TimerControl } from '../molecules/TimerControl';
import { Button } from '../atoms/Button';
import { useEffortStore } from '@/store/effortStore';

export const TimerContainer: React.FC = () => {
  const timers = useEffortStore((state) => state.timers);
  const addTimer = useEffortStore((state) => state.addTimer);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          onClick={addTimer}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
          </svg>
          Yeni Timer Ekle
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {timers.map((timer) => (
          <TimerControl
            key={timer.id}
            timer={timer}
          />
        ))}
      </div>
    </div>
  );
};