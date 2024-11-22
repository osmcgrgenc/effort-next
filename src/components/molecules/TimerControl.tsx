import { useState } from 'react';
import { Timer } from '../atoms/Timer';
import { Button } from '../atoms/Button';
import { Select } from '../atoms/Select';
import { Input } from '../atoms/Input';
import { useEffortStore } from '@/store/effortStore';
import { PROJECTS } from '@/constants/projects';

interface TimerControlProps {
  timer: {
    id: string;
    isRunning: boolean;
    startTime: number | null;
    duration: number;
    title: string;
    project: typeof PROJECTS[number] | null;
    task: string;
    description: string;
  };
}

export const TimerControl: React.FC<TimerControlProps> = ({ timer }) => {
  const [showProjectForm, setShowProjectForm] = useState(!timer.project);
  const startTimer = useEffortStore((state) => state.startTimer);
  const stopTimer = useEffortStore((state) => state.stopTimer);
  const resetTimer = useEffortStore((state) => state.resetTimer);
  const removeTimer = useEffortStore((state) => state.removeTimer);
  const setTimerDetails = useEffortStore((state) => state.setTimerDetails);
  const completeTimer = useEffortStore((state) => state.completeTimer);

  const handleStartTimer = () => {
    if (!timer.project || !timer.task || !timer.description) {
      setShowProjectForm(true);
      return;
    }
    startTimer(timer.id);
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const project = form.project.value;
    const task = form.task.value;
    const description = form.description.value;

    if (project && task && description) {
      setTimerDetails(timer.id, { project, task, description });
      setShowProjectForm(false);
    }
  };

  const handleComplete = () => {
    if (timer.duration > 0) {
      completeTimer(timer.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 transition-all hover:shadow-md relative group">
      {timer.id !== '1' && (
        <button
          onClick={() => removeTimer(timer.id)}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      <h3 className="text-lg font-medium text-gray-700 mb-6">{timer.title}</h3>

      {showProjectForm ? (
        <form onSubmit={handleProjectSubmit} className="space-y-4 mb-6">
          <Select
            name="project"
            label="Proje"
            options={PROJECTS}
            defaultValue={timer.project || ''}
            required
          />
          <Input
            name="task"
            label="Görev"
            placeholder="Görev adını giriniz"
            defaultValue={timer.task}
            required
          />
          <Input
            name="description"
            label="Açıklama"
            placeholder="Yapılan işin açıklaması"
            defaultValue={timer.description}
            required
          />
          <Button type="submit" className="w-full">
            Kaydet
          </Button>
        </form>
      ) : (
        <>
          <div className="mb-4 space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Proje:</span> {timer.project}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Görev:</span> {timer.task}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Açıklama:</span> {timer.description}
            </p>
          </div>
          <div className="mb-8">
            <Timer
              isRunning={timer.isRunning}
              startTime={timer.startTime}
              duration={timer.duration}
            />
          </div>
        </>
      )}

      {!showProjectForm && (
        <div className="flex gap-3">
          {!timer.isRunning ? (
            <>
              <Button
                onClick={handleStartTimer}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600"
              >
                Başlat
              </Button>
              {timer.duration > 0 && (
                <Button
                  onClick={handleComplete}
                  variant="secondary"
                  className="flex-1"
                >
                  Bitir
                </Button>
              )}
            </>
          ) : (
            <Button
              onClick={() => stopTimer(timer.id)}
              variant="danger"
              className="flex-1"
            >
              Durdur
            </Button>
          )}
          
          <Button
            onClick={() => resetTimer(timer.id)}
            variant="secondary"
            className="flex-1"
          >
            Sıfırla
          </Button>
          
          <Button
            onClick={() => setShowProjectForm(true)}
            variant="secondary"
            className="flex-1"
          >
            Düzenle
          </Button>
        </div>
      )}
    </div>
  );
};