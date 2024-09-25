import { Routes } from '@angular/router';

import {
  IrrigationSchedulerComponent
} from './agricultural-process/pages/irrigation-scheduler/irrigation-scheduler.component';
import {IrrigationViewComponent} from "./agricultural-process/pages/irrigation-view/irrigation-view.component";
import {
  CropTreatmentSchedulerComponent
} from './agricultural-process/pages/crop-treatment-scheduler/crop-treatment-scheduler.component';
import {
  SeedingRegistrationComponent
} from './agricultural-process/pages/seeding-registration/seeding-registration.component';
import { LoginFormComponent } from './profile-management/components/login-form/login-form.component';
import {
  HomeAgriculturalProcessComponent
} from "./public/pages/home-agricultural-process/home-agricultural-process.component";
import {HomeViewComponent} from "./agricultural-process/pages/home-view/home-view.component";
import {FieldsViewComponent} from "./fields/pages/fields-view/fields-view.component";
import {WorkerManagementComponent} from "./fields/pages/worker-management/worker-management.component";
import {
  CropTreatmentViewComponent
} from "./agricultural-process/pages/crop-treatment-view/crop-treatment-view.component";


export const routes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent,
    data: { name: 'login' }
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'field/:role/:id',
    component: FieldsViewComponent,
    data: { name: 'field' }
  },
  {
    path: '', component: HomeAgriculturalProcessComponent,
    children: [
      {
        path: 'home-agricultural-process/:id',
        component: HomeViewComponent,
      },
      {
        path: 'worker-management',
        component: WorkerManagementComponent,
      },
      {
        path: 'irrigation-scheduler',
        component: IrrigationSchedulerComponent,
        data: { name: 'irrigation-scheduler' }
      },
      {
        path: 'irrigation-view',
        component: IrrigationViewComponent,
      },
      {
        path: 'seeding-registration',
        component: SeedingRegistrationComponent,
        data: { name: 'seeding-registration' }
      },
      {
        path: 'crop-treatment-view',
        component: CropTreatmentViewComponent,
        data: { name: 'crop-treatment-view' }
      },
      {
        path: 'crop-treatment-scheduler',
        component: CropTreatmentSchedulerComponent,
        data: { name: 'crop-treatment-scheduler' }
      }
    ]
  }
];
