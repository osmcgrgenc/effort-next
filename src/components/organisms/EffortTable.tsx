import { useEffortStore } from '@/store/effortStore';
import { Button } from '../atoms/Button';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const EffortTable: React.FC = () => {
  const completedEfforts = useEffortStore((state) => state.completedEfforts);

  const exportToExcel = () => {
    // Verileri Excel formatına uygun hale getir
    const excelData = completedEfforts.map(effort => ({
      'Tarih': effort.tarih,
      'Personel': effort.personel,
      'Kullanıcı': effort.kullanici,
      'Proje': effort.proje,
      'Görev': effort.gorev,
      'Açıklama': effort.aciklama,
      'Miktar (Saat)': effort.miktar
    }));

    // Excel çalışma kitabı oluştur
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Eforlar');

    // Sütun genişliklerini ayarla
    const maxWidth = excelData.reduce((acc, row) => {
      Object.keys(row).forEach(key => {
        const value = row[key as keyof typeof row];
        const length = value?.toString().length || 0;
        acc[key] = Math.max(acc[key] || 0, length);
      });
      return acc;
    }, {} as Record<string, number>);

    worksheet['!cols'] = Object.keys(maxWidth).map(key => ({
      wch: Math.min(Math.max(maxWidth[key], key.length), 50)
    }));

    // Excel dosyasını oluştur ve indir
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const today = new Date().toISOString().split('T')[0];
    const fileName = `Eforlar_${today}.xlsx`;
    
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, fileName);
  };

  if (completedEfforts.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Tamamlanan Eforlar</h2>
        <Button
          onClick={exportToExcel}
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
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" 
            />
          </svg>
          Excel&apos;e Aktar
        </Button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Personel</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proje</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Görev</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Açıklama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Miktar (Saat)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {completedEfforts.map((effort) => (
              <tr key={effort.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{effort.tarih}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{effort.personel}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{effort.proje}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{effort.gorev}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{effort.aciklama}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{effort.miktar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};