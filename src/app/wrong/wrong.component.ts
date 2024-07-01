import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

const fadeInStagger = trigger('fadeInStagger', [
  transition(':enter', [
    query('h1,.mt-2,p', [
      style({ opacity: 0, transform: 'translateY(-12px)' }),
      stagger('200ms', [
        animate('0.5s ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);

@Component({
  selector: 'app-wrong',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wrong.component.html',
  styleUrl: './wrong.component.css',
  animations: [fadeInStagger],
})
export class WrongComponent {

}
