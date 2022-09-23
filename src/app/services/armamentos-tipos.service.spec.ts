import { TestBed } from '@angular/core/testing';

import { ArmamentosTiposService } from './armamentos-tipos.service';

describe('ArmamentosTiposService', () => {
  let service: ArmamentosTiposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmamentosTiposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
