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
  styleUrl: './captcha.component.css'
})

  export class CaptchaComponent implements OnInit, OnDestroy {

    currentState: number = 1;
    states: number[] = [1, 2, 3]; // Define the states array
    highestStateReached = 1;
    private currentStateSubscription?: Subscription;
    private highestStateReachedSubscription?: Subscription;
    
    constructor(private router: Router, private stateService: StateService) {
    }

    ngOnInit(): void {
      this.currentStateSubscription = this.stateService.currentState$.subscribe(state => {
        this.currentState = state;
        console.log("current: ng " + this.currentState);
      });
      this.highestStateReachedSubscription = this.stateService.highestStateReached$.subscribe(reach => {
        this.highestStateReached = reach;
        console.log("highest: ng " + this.highestStateReached);
      });
    }

    ngOnDestroy(): void {
      // unsubscribe to ensure no memory leaks
      this.currentStateSubscription?.unsubscribe();
      this.highestStateReachedSubscription?.unsubscribe();
    }

    goToState(stageIndex: number): void {
      console.log("go to:" + stageIndex);
      console.log("highest: " + this.highestStateReached);
      console.log("current: " + this.currentState);
      if (stageIndex < this.highestStateReached) {
        this.currentState = stageIndex + 1;
        this.stateService.updateCurrentState(this.currentState);
        this.redirectToNextCaptcha();
      }
    }

    restart(): void {
      this.stateService.resetState();
      this.router.navigate(['/']);
    }
    
    handleCaptchaResults(isCorrect: boolean) {
      var returnValue = false;
      if (isCorrect) {
        if (this.currentState === this.highestStateReached) {
          this.highestStateReached++;
          console.log("highest updated now: " + this.highestStateReached);
        }
        this.currentState++;
        this.stateService.updateCurrentState(this.currentState);
        this.stateService.updateHighestStateReached(this.highestStateReached);
        console.log("current updated now: " + this.currentState);
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

    private redirectToNextCaptcha() {
      this.router.navigate(['/captcha']);
    }

    private redirectToResultComponent() {
      this.router.navigate(['/result']);
    }
  }


  


