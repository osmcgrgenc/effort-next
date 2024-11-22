export interface EffortRecord {
  personel: string;
  kullanici: string;
  proje: string;
  referans: string;
  gorev: string;
  aciklama: string;
  tarih: Date;
  miktar: number;
}

export interface TimerState {
  isRunning: boolean;
  startTime: number | null;
  duration: number;
} 