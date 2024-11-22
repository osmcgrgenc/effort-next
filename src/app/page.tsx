'use client';

import { EmployeeForm } from '@/components/molecules/EmployeeForm';
import { TimerContainer } from '@/components/organisms/TimerContainer';
import { EffortTable } from '@/components/organisms/EffortTable';
import { useEffortStore } from '@/store/effortStore';
import { EmployeeNameEditor } from '@/components/molecules/EmployeeNameEditor';

export default function Home() {
  const isEmployeeSet = useEffortStore((state) => state.employee.isSet);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        {!isEmployeeSet ? (
          <EmployeeForm />
        ) : (
          <div className="space-y-8">
            <div className="text-center">
                <EmployeeNameEditor />
            </div>
            <TimerContainer />
            <EffortTable />
          </div>
        )}
      </div>
    </main>
  );
}