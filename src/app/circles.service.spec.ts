import { TestBed, inject } from '@angular/core/testing';

import { CirclesService } from './circles.service';

describe('CirclesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CirclesService]
    });
  });

  it('should be created', inject([CirclesService], (service: CirclesService) => {
    expect(service).toBeTruthy();
  }));
});
