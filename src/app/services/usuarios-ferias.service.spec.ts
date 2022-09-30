import { TestBed } from '@angular/core/testing';

import { UsuariosFeriasService } from './usuarios-ferias.service';

describe('UsuariosFeriasService', () => {
  let service: UsuariosFeriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosFeriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
