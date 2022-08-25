import { TestBed } from '@angular/core/testing';

import { PostosTurnosService } from './postos-turnos.service';

describe('PostosTurnosService', () => {
  let service: PostosTurnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostosTurnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
