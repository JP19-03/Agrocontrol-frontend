import { TestBed } from '@angular/core/testing';

import { AgriculturalActivityService } from './agricultural-activity.service';

describe('AgriculturalActivityService', () => {
  let service: AgriculturalActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgriculturalActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
