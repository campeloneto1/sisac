import { TestBed } from '@angular/core/testing';

import { EscalasService } from './escalas.service';

describe('EscalasService', () => {
  let service: EscalasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscalasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
