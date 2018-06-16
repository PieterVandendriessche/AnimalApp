import { TestBed, inject } from '@angular/core/testing';

import { AnimalDataService } from './animal-data.service';

describe('AnimalDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnimalDataService]
    });
  });

  it('should be created', inject([AnimalDataService], (service: AnimalDataService) => {
    expect(service).toBeTruthy();
  }));
});
