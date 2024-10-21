export class AgriculturalActivity {
  id: number;
  agriculturalProcessId: number;
  activityType: string;
  date: string;
  hoursIrrigated: number;
  plantType: string;
  quantityPlanted: number;

  constructor(agriculturalActivity:{
    id?: number;
    agriculturalProcessId?: number;
    activityType?: string;
    date?: string;
    hoursIrrigated?: number;
    plantType?: string;
    quantityPlanted?: number;
  }) {
    this.id = agriculturalActivity.id || 0;
    this.agriculturalProcessId = agriculturalActivity.agriculturalProcessId || 0;
    this.activityType = agriculturalActivity.activityType || "";
    this.date = agriculturalActivity.date || "";
    this.hoursIrrigated = agriculturalActivity.hoursIrrigated || 0;
    this.plantType = agriculturalActivity.plantType || "";
    this.quantityPlanted = agriculturalActivity.quantityPlanted || 0;
  }
}
