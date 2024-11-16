import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IrrigationSchedulerComponent} from './irrigation-scheduler.component';

describe('IrrigationSchedulerComponent', () => {
  let component: IrrigationSchedulerComponent;
  let fixture: ComponentFixture<IrrigationSchedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IrrigationSchedulerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IrrigationSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
