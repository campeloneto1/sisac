import { TestBed } from '@angular/core/testing';

import { TiposOcorrenciasService } from './tipos-ocorrencias.service';

describe('TiposOcorrenciasService', () => {
  let service: TiposOcorrenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposOcorrenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
