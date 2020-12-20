import { TestBed } from '@angular/core/testing';

import { TunisairService } from './tunisair.service';

describe('TunisairService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TunisairService = TestBed.get(TunisairService);
    expect(service).toBeTruthy();
  });
});
