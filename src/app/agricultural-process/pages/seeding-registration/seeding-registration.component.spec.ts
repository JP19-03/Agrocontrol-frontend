import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SeedingRegistrationComponent} from './seeding-registration.component';

describe('SeedingRegistrationComponent', () => {
  let component: SeedingRegistrationComponent;
  let fixture: ComponentFixture<SeedingRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeedingRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeedingRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
