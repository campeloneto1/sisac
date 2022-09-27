import { TestBed } from '@angular/core/testing';

import { VeiculosEmprestimosService } from './veiculos-emprestimos.service';

describe('EmprestimosService', () => {
  let service: VeiculosEmprestimosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VeiculosEmprestimosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
