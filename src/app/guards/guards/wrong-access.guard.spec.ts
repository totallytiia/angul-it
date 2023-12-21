import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { wrongAccessGuard } from './wrong-access.guard';

describe('wrongAccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => wrongAccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
