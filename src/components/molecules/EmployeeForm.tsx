import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { useEffortStore } from '@/store/effortStore';

const schema = Yup.object().shape({
  employeeName: Yup.string()
    .required('Çalışan adı zorunludur')
    .min(3, 'Çalışan adı en az 3 karakter olmalıdır')
});

type FormData = {
  employeeName: string;
};

export const EmployeeForm: React.FC = () => {
  const setEmployee = useEffortStore((state) => state.setEmployee);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      employeeName: ''
    }
  });

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data); // Debug için
    setEmployee(data.employeeName);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Çalışan Bilgileri
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Çalışan Adı"
          placeholder="Ad ve Soyad giriniz"
          error={errors.employeeName?.message}
          {...register('employeeName')}
        />
        
        <Button 
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600"
        >
          Başla
        </Button>
      </form>
    </div>
  );
}; 