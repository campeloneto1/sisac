import { TestBed } from '@angular/core/testing';

import { AdministracaoService } from './administracao.service';

describe('AdministracaoService', () => {
  let service: AdministracaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministracaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
