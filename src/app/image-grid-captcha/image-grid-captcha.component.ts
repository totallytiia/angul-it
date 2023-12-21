import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

const expectedGrid = [
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [true, true, true, false, false, false],
  [true, true, true, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false]
];

@Component({
  selector: 'app-image-grid-captcha',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-grid-captcha.component.html',
  styleUrls: ['./image-grid-captcha.component.css']
})
export class ImageGridCaptchaComponent {
  
  // set the grid to be a 6x6 array of objects with a selected property
  constructor() {
    this.grid = Array.from({ length: 6 }, () =>
    Array.from({ length: 6 }, () => ({ selected: false }))
    );
  }


  grid: { selected: boolean }[][];
  @Output() result = new EventEmitter<boolean>();


  // toggle the selected property of the cell at the given coordinates
  toggleCell(i: number, j: number) {
    if (i >= 0 && i < 6 && j >= 0 && j < 6) {
      if (this.grid[i][j].selected) {
        this.grid[i][j].selected = false;
      } else {
        this.grid[i][j].selected = true;
      }
    }
  }

  validateSelection() {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (this.grid[j][i].selected !== expectedGrid[i][j]) {
          this.result.emit(false);
          return;
        }
      }
    }
    this.result.emit(true);
  }
}
