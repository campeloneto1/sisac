import { TestBed } from '@angular/core/testing';

import { EscalasUsersService } from './escalas-users.service';

describe('EscalasUsersService', () => {
  let service: EscalasUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscalasUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
