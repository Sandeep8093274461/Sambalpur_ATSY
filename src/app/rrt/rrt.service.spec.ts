import { TestBed } from '@angular/core/testing';

import { RrtService } from './rrt.service';

describe('RrtService', () => {
  let service: RrtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RrtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
