import { CanActivateFn } from '@angular/router';

export const wrongAccessGuard: CanActivateFn = () => {

  // only activate if the user answered the captcha incorrectly

  
  return true;
};
