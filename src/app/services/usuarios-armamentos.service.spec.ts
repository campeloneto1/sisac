import { TestBed } from '@angular/core/testing';

import { UsuariosArmamentosService } from './usuarios-armamentos.service';

describe('UsuariosArmamentosService', () => {
  let service: UsuariosArmamentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosArmamentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
