import { TestBed } from '@angular/core/testing';

import { IrsosService } from './irsos.service';

describe('IrsosService', () => {
  let service: IrsosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IrsosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
