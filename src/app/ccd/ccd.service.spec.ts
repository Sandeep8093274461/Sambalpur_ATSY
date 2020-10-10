import { TestBed } from '@angular/core/testing';

import { CcdService } from './ccd.service';

describe('CcdService', () => {
  let service: CcdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CcdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
