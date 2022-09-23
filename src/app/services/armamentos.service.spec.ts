import { TestBed } from '@angular/core/testing';

import { ArmamentosService } from './armamentos.service';

describe('ArmamentosService', () => {
  let service: ArmamentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmamentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
