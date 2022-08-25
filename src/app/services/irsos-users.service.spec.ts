import { TestBed } from '@angular/core/testing';

import { IrsosUsersService } from './irsos-users.service';

describe('IrsosUsersService', () => {
  let service: IrsosUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IrsosUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
