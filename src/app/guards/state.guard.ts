import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StateService } from '../service/state.service';

export const stateGuard: CanActivateFn = (route, state) => {
  var returnValue = false;
  var stateService = inject(StateService);
  var router = inject(Router);
  if (stateService.loadState('currentState', 1) === 4) {
    returnValue = true;
    console.log("stateGuard: true");
  } else {
    router.navigate(['/home']);
  }
  return returnValue;
};
