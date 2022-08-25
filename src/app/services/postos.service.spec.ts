import { TestBed } from '@angular/core/testing';

import { PostosService } from './postos.service';

describe('PostosService', () => {
  let service: PostosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
