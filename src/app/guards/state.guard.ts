import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StateService } from '../service/state.service';

// The stateGuard function is a CanActivateFn that checks if the current state is 4.
// If it is, the function returns true; otherwise, it redirects the user to the home page.

export const stateGuard: CanActivateFn = (route, state) => {
  var returnValue = false;
  var stateService = inject(StateService);
  var router = inject(Router);
  // if the current state is 4, return true
  if (stateService.loadState('currentState', 1) === 4) {
    returnValue = true;
  } else {
    router.navigate(['/home']);
  }
  return returnValue;
};
