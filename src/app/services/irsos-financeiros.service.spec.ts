import { TestBed } from '@angular/core/testing';

import { IrsosFinanceirosService } from './irsos-financeiros.service';

describe('IrsosFinanceirosService', () => {
  let service: IrsosFinanceirosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IrsosFinanceirosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
