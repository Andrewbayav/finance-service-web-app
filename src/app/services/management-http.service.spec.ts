import { TestBed } from '@angular/core/testing';

import { ManagementHttpService } from './management-http.service';

describe('ManagementHttpService', () => {
  let service: ManagementHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagementHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
