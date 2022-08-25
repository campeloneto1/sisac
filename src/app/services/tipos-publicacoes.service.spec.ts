import { TestBed } from '@angular/core/testing';

import { TiposPublicacoesService } from './tipos-publicacoes.service';

describe('PublicacoesService', () => {
  let service: TiposPublicacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposPublicacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
