import { TestBed } from '@angular/core/testing';

import { GraduacoesService } from './graduacoes.service';

describe('GraduacoesService', () => {
  let service: GraduacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraduacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
