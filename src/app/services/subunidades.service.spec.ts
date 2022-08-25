import { TestBed } from '@angular/core/testing';

import { SubunidadesService } from './subunidades.service';

describe('SubunidadesService', () => {
  let service: SubunidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubunidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
