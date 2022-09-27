import { TestBed } from '@angular/core/testing';

import { MateriaisTiposService } from './materiais-tipos.service';

describe('MateriaisTiposService', () => {
  let service: MateriaisTiposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriaisTiposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
