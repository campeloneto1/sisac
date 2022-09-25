import { TestBed } from '@angular/core/testing';

import { EscalasDispensasService } from './escalas-dispensas.service';

describe('EscalasDispensasService', () => {
  let service: EscalasDispensasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscalasDispensasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
