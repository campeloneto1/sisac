import { TestBed } from '@angular/core/testing';

import { UsuariosAfastamentosService } from './usuarios-afastamentos.service';

describe('UsersLtsService', () => {
  let service: UsuariosAfastamentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosAfastamentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
