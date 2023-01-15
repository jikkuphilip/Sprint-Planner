import { TestBed } from '@angular/core/testing';

import { SprintplannerService } from './sprintplanner.service';

describe('SprintplannerService', () => {
  let service: SprintplannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SprintplannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
