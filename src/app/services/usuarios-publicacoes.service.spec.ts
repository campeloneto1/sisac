import { TestBed } from '@angular/core/testing';

import { UsuariosPublicacoesService } from './usuarios-publicacoes.service';

describe('UsersPublicacoesService', () => {
  let service: UsuariosPublicacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosPublicacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
