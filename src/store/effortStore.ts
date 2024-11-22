import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PROJECTS } from '@/constants/projects';

interface Timer {
  id: string;
  isRunning: boolean;
  startTime: number | null;
  duration: number;
  title: string;
  project: typeof PROJECTS[number] | null;
  task: string;
  description: string;
}

interface CompletedEffort {
  id: string;
  personel: string;
  kullanici: string;
  proje: string;
  gorev: string;
  aciklama: string;
  tarih: string;
  miktar: number; // saat cinsinden
}

interface EffortState {
  employee: {
    name: string;
    isSet: boolean;
  };
  timers: Timer[];
  completedEfforts: CompletedEffort[];
  setEmployee: (name: string) => void;
  addTimer: () => void;
  removeTimer: (id: string) => void;
  startTimer: (id: string) => void;
  stopTimer: (id: string) => void;
  resetTimer: (id: string) => void;
  setTimerProject: (id: string, project: typeof PROJECTS[number]) => void;
  setTimerDescription: (id: string, description: string) => void;
  setTimerDetails: (id: string, details: { 
    project: typeof PROJECTS[number], 
    task: string, 
    description: string 
  }) => void;
  completeTimer: (timerId: string) => void;
  updateEmployee: (name: string) => void;
  updateEffortEmployee: (oldName: string, newName: string) => void;
  clearCompletedEfforts: () => void;
}

export const useEffortStore = create<EffortState>()(
  persist(
    (set, get) => ({
      employee: {
        name: '',
        isSet: false,
      },
      timers: [
        {
          id: '1',
          isRunning: false,
          startTime: null,
          duration: 0,
          title: 'Timer 1',
          project: null,
          task: '',
          description: ''
        }
      ],
      completedEfforts: [],
      setEmployee: (name) => 
        set(() => ({ 
          employee: { 
            name, 
            isSet: true 
          } 
        })),
      addTimer: () =>
        set((state) => ({
          timers: [
            ...state.timers,
            {
              id: Date.now().toString(),
              isRunning: false,
              startTime: null,
              duration: 0,
              title: `Timer ${state.timers.length + 1}`,
              project: null,
              task: '',
              description: ''
            }
          ]
        })),
      removeTimer: (id) =>
        set((state) => ({
          timers: state.timers.filter(timer => timer.id !== id)
        })),
      startTimer: (id) =>
        set((state) => ({
          timers: state.timers.map(timer =>
            timer.id === id
              ? { ...timer, isRunning: true, startTime: Date.now() }
              : timer
          )
        })),
      stopTimer: (id) =>
        set((state) => ({
          timers: state.timers.map(timer =>
            timer.id === id
              ? {
                  ...timer,
                  isRunning: false,
                  duration: timer.duration + (Date.now() - (timer.startTime || Date.now()))
                }
              : timer
          )
        })),
      resetTimer: (id) =>
        set((state) => ({
          timers: state.timers.map(timer =>
            timer.id === id
              ? { ...timer, isRunning: false, startTime: null, duration: 0 }
              : timer
          )
        })),
      setTimerProject: (id: string, project: typeof PROJECTS[number]) =>
        set((state) => ({
          timers: state.timers.map(timer =>
            timer.id === id ? { ...timer, project } : timer
          )
        })),
      setTimerDescription: (id: string, description: string) =>
        set((state) => ({
          timers: state.timers.map(timer =>
            timer.id === id ? { ...timer, description } : timer
          )
        })),
      setTimerDetails: (id: string, details: { 
        project: typeof PROJECTS[number], 
        task: string, 
        description: string 
      }) =>
        set((state) => ({
          timers: state.timers.map(timer =>
            timer.id === id ? { ...timer, ...details } : timer
          )
        })),
      completeTimer: (timerId: string) => {
        const state = get();
        const timer = state.timers.find(t => t.id === timerId);
        
        if (timer) {
          const hours = timer.duration / (1000 * 60 * 60); // milisaniyeyi saate çevir
          
          set((state) => ({
            completedEfforts: [...state.completedEfforts, {
              id: Date.now().toString(),
              personel: state.employee.name,
              kullanici: state.employee.name,
              proje: timer.project || '',
              gorev: timer.task,
              aciklama: timer.description,
              tarih: new Date().toISOString().split('T')[0],
              miktar: Number(hours.toFixed(2))
            }],
            timers: state.timers.map(t => 
              t.id === timerId 
                ? {
                    ...t,
                    duration: 0,
                    startTime: null,
                    isRunning: false
                  }
                : t
            )
          }));
        }
      },
      updateEmployee: (name: string) =>
        set((state) => ({
          employee: {
            ...state.employee,
            name
          }
        })),
      updateEffortEmployee: (oldName: string, newName: string) =>
        set((state) => ({
          completedEfforts: state.completedEfforts.map(effort => ({
            ...effort,
            personel: effort.personel === oldName ? newName : effort.personel,
            kullanici: effort.kullanici === oldName ? newName : effort.kullanici
          }))
        })),
      clearCompletedEfforts: () => 
        set(() => ({ 
          completedEfforts: [] 
        })),
    }),
    {
      name: 'effort-storage',
      partialize: (state) => ({
        employee: state.employee,
        timers: state.timers,
        completedEfforts: state.completedEfforts
      }),
    }
  )
) 