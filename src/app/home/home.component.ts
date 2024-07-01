import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StateService } from '../service/state.service';

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
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeInStagger],
})
export class HomeComponent implements OnInit {
  stateService = inject(StateService);

  constructor() {}

  ngOnInit(): void {
    this.stateService.resetState();
    localStorage.clear();
  }
}
