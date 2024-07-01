import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-math-captcha',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './math-captcha.component.html',
  styleUrl: './math-captcha.component.css'
})
export class MathCaptchaComponent {

  state: number = 0;
  private wordImageCaptchaTriesSubscription?: Subscription;;

  constructor() {
    this.firstNumber = this.randomNumber();
    this.secondNumber = this.randomNumber();
    this.userAnswer = '';
  }

  firstNumber = this.randomNumber();
  secondNumber = this.randomNumber();
  userAnswer: String;
  @Output() result = new EventEmitter<boolean>();

  verifyMathCaptcha() {
    const isCorrect = this.userAnswer === (this.firstNumber + this.secondNumber).toString();
    this.result.emit(isCorrect);
  }

  private randomNumber(): number {
    return Math.floor(Math.random() * 20);
  }
}
