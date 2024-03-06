import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StateService } from '../service/state.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})

export class ResultComponent {

  totalStagesCompleted?: number; // Public property to hold the total number of stages completed
  totalStages: number; // Public property to hold the total number of stages

  // Constructor to inject the StageService and Router
  constructor(private stateService: StateService, private router: Router) {
    this.stateService.highestStateReached$.subscribe((highestStateReached: number) => {
      this.totalStagesCompleted = highestStateReached; // Assign the value from the service
    });
    this.totalStages = 4; // Assign the value from the service
  }

  clearState() {
    this.stateService.resetState();
  }

}
