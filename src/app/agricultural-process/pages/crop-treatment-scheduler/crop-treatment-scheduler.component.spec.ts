import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CropTreatmentSchedulerComponent} from './crop-treatment-scheduler.component';

describe('CropTreatmentSchedulerComponent', () => {
  let component: CropTreatmentSchedulerComponent;
  let fixture: ComponentFixture<CropTreatmentSchedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropTreatmentSchedulerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropTreatmentSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
