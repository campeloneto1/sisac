import { TestBed } from '@angular/core/testing';

import { EscalasPostosService } from './escalas-postos.service';

describe('EscalasPostosService', () => {
  let service: EscalasPostosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscalasPostosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
