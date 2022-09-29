import { TestBed } from '@angular/core/testing';

import { UsuariosPromocoesService } from './usuarios-promocoes.service';

describe('UsuariosPromocoesService', () => {
  let service: UsuariosPromocoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosPromocoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
