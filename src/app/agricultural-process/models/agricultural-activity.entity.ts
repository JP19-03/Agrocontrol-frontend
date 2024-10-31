export class AgriculturalActivity {
  id: number;
  agriculturalProcessId: number;
  activityType: string;
  date: string;
  activityStatus: string;
  hoursIrrigated: number;
  plantType: string;
  quantityPlanted: number;
  treatmentType: string;
  resources: any;

  constructor(agriculturalActivity:{
    id?: number;
    agriculturalProcessId?: number;
    activityType?: string;
    date?: string;
    activityStatus?: string;
    hoursIrrigated?: number;
    plantType?: string;
    quantityPlanted?: number;
    treatmentType?: string;
    resources?: any;
  }) {
    this.id = agriculturalActivity.id || 0;
    this.agriculturalProcessId = agriculturalActivity.agriculturalProcessId || 0;
    this.activityType = agriculturalActivity.activityType || "";
    this.date = agriculturalActivity.date || "";
    this.activityStatus = agriculturalActivity.activityStatus || "";
    this.hoursIrrigated = agriculturalActivity.hoursIrrigated || 0;
    this.plantType = agriculturalActivity.plantType || "";
    this.quantityPlanted = agriculturalActivity.quantityPlanted || 0;
    this.treatmentType = agriculturalActivity.treatmentType || "";
    this.resources = agriculturalActivity.resources || {};
  }
}
