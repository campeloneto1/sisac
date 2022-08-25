import { TestBed } from '@angular/core/testing';

import { ModalidadesPostosService } from './modalidades-postos.service';

describe('ModalidadesPostosService', () => {
  let service: ModalidadesPostosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalidadesPostosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
