import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { resultAccessGuard } from './result-access.guard';

describe('resultAccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => resultAccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
