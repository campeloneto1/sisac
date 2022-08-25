import { TestBed } from '@angular/core/testing';

import { EscalasModelosService } from './escalas-modelos.service';

describe('EscalasModelosService', () => {
  let service: EscalasModelosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscalasModelosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
