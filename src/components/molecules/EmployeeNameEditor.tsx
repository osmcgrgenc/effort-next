import { useState } from 'react';
import { useEffortStore } from '@/store/effortStore';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';

export const EmployeeNameEditor: React.FC = () => {
  const employeeName = useEffortStore((state) => state.employee.name);
  const updateEmployee = useEffortStore((state) => state.updateEmployee);
  const updateEffortEmployee = useEffortStore((state) => state.updateEffortEmployee);

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(employeeName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim() && newName !== employeeName) {
      updateEffortEmployee(employeeName, newName.trim());
      updateEmployee(newName.trim());
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="text-center">
        <form onSubmit={handleSubmit} className="inline-flex flex-col gap-4">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Çalışan Adı"
            className="text-center"
            autoFocus
          />
          <div className="flex gap-2 justify-center">
            <Button type="submit" className="px-4">
              Kaydet
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setNewName(employeeName);
                setIsEditing(false);
              }}
              className="px-4"
            >
              İptal
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="text-center group relative inline-block">
      <p className="text-sm text-gray-500 mb-1">Hoş geldin</p>
      <div className="flex items-center gap-2 justify-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          {employeeName}
        </h2>
        <button
          onClick={() => setIsEditing(true)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}; 