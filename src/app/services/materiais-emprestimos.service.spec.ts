import { TestBed } from '@angular/core/testing';

import { MateriaisEmprestimosService } from './materiais-emprestimos.service';

describe('MateriaisEmprestimosService', () => {
  let service: MateriaisEmprestimosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriaisEmprestimosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
