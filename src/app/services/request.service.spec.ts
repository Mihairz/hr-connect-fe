import { TestBed } from '@angular/core/testing';

import { UserRequestService } from './request.service';

describe('RequestService', () => {
  let service: UserRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
