import { TestBed } from '@angular/core/testing';

import { PatrimoniosTiposService } from './patrimonios-tipos.service';

describe('PatrimoniosTiposService', () => {
  let service: PatrimoniosTiposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatrimoniosTiposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
