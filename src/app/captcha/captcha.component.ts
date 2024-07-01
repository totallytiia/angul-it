import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ImageGridCaptchaComponent } from '../image-grid-captcha/image-grid-captcha.component';
import { MathCaptchaComponent } from '../math-captcha/math-captcha.component';
import { StateService } from '../service/state.service';
import { WordImageCaptchaComponent } from '../word-image-captcha/word-image-captcha.component';

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [CommonModule,
    WordImageCaptchaComponent,
    ImageGridCaptchaComponent,
    MathCaptchaComponent,
    RouterModule,
    RouterLink],
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.css',
  animations: [
    trigger('levels', [
      transition(':enter', [
        style({ opacity: 0 }),
        query('p', [
          style({ opacity: 0, transform: 'translateY(-6px)', background: 'none'}),
          stagger('150ms', [
          animate('0.3s ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
          ]),
        ], { optional: true }),
        animate('0.3s 0.1s', style({ opacity: 1 } ))
      ])
    ]),
    trigger('fadeInStagger', [
      transition(':enter', [
        query('h1,.mt-2,p, button, input, canvas', [
        style({ opacity: 0, transform: 'translateY(-6px)' }),
        stagger('100ms', [
        animate('0.2s ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
        ]),
        ], { optional: true })
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-6px)' }),
        animate('0.3s 0.6s', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
  ]
})

  export class CaptchaComponent implements OnInit, OnDestroy {

    currentState: number = 1;
    states: number[] = [1, 2, 3]; // Define the states array
    highestStateReached = 1;
    private currentStateSubscription?: Subscription;
    private highestStateReachedSubscription?: Subscription;
    
    constructor(private router: Router, private stateService: StateService) {
    }

    // Subscribe to the currentState$ and highestStateReached$ observables
    ngOnInit(): void {
      this.currentStateSubscription = this.stateService.currentState$.subscribe(state => {
        this.currentState = state;
      });
      this.highestStateReachedSubscription = this.stateService.highestStateReached$.subscribe(reach => {
        this.highestStateReached = reach;
      });
    }

    ngOnDestroy(): void {
      // unsubscribe to ensure no memory leaks
      this.currentStateSubscription?.unsubscribe();
      this.highestStateReachedSubscription?.unsubscribe();
    }

    // move to the next state
    goToState(stageIndex: number): void {
      if (stageIndex < this.highestStateReached) {
        this.currentState = stageIndex + 1;
        this.stateService.updateCurrentState(this.currentState);
        this.redirectToNextCaptcha();
      }
    }

    // reset the state
    restart(): void {
      this.stateService.resetState();
      this.router.navigate(['/']);
    }
    
    // handle the result of the CAPTCHA
    // if the result is correct, move to the next CAPTCHA
    // if the result is incorrect, redirect to the wrong component, and reset the state
    handleCaptchaResults(isCorrect: boolean) {
      var returnValue = false;
      if (isCorrect) {
        if (this.currentState === this.highestStateReached) {
          this.highestStateReached++;
        }
        this.currentState++;
        this.stateService.updateCurrentState(this.currentState);
        this.stateService.updateHighestStateReached(this.highestStateReached);
        if (this.currentState === 4) {
          returnValue = true;
          this.redirectToResultComponent();
        } else {
          this.redirectToNextCaptcha();
        }
      } else {
        this.redirectToWrongComponent();
        this.stateService.resetState();
      }
      return returnValue;
    }


    // handleMathCaptchaResult(isCorrect: boolean) {
    //   if (isCorrect) {
    //     this.currentState = 2; // Move to photo grid CAPTCHA
    //     this.updateHighestStateReached(2);
    //     this.redirectToNextCaptcha();
    //   } else {
    //     this.redirectToWrongComponent();
    //   }
    // }

    // handleWordImageCaptchaResult(isCorrect: boolean) {
    //   if (isCorrect) {
    //     this.currentState = 3; // Move to image word CAPTCHA
    //     this.updateHighestStateReached(3);
    //     this.redirectToNextCaptcha();
    //   } else {
    //     this.redirectToWrongComponent();
    //   }
    // }

    // handleImageGridCaptchaResult(isCorrect: boolean) {
    //   console.log(isCorrect);
    //   if (isCorrect) {
    //     this.currentState = 3; // Move to image word CAPTCHA
    //     this.redirectToResultComponent();
    //   } else {
    //     this.redirectToWrongComponent();
    //   }
    // }

    private redirectToWrongComponent() {
      this.router.navigate(['/wrong']);
    }


    // redirect to the next CAPTCHA
    private redirectToNextCaptcha() {
      this.router.navigate(['/captcha']);
    }


    // redirect to the result component
    private redirectToResultComponent() {
      this.router.navigate(['/result']);
    }
  }