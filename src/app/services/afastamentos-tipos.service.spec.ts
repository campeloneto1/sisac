import { TestBed } from '@angular/core/testing';

import { AfastamentosTiposService } from './afastamentos-tipos.service';

describe('AfastamentosTiposService', () => {
  let service: AfastamentosTiposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfastamentosTiposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
