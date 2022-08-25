import { TestBed } from '@angular/core/testing';

import { EscalasModalidadesService } from './escalas-modalidades.service';

describe('EscalasModalidadesService', () => {
  let service: EscalasModalidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscalasModalidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
