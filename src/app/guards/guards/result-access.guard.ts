import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { StateService } from '../../service/state.service';

export function resultAccessGuard(): Observable<boolean | UrlTree> {

  // Inject the StageService and Router
  const stageService: StateService = inject(StateService);
  const router: Router = inject(Router);

  console.log("resultAccessGuard");
  
  // If the highest stage completed is equal to the total number of stages, return true
  return stageService.highestStateReached$.pipe(
    map((highestStateReached: number) => highestStateReached === 4),
    tap(isValid => {
      if (!isValid) {
        router.navigate(['/']);// Otherwise, navigate back to the home page
      }
    })
  );
};
