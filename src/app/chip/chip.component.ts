import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent implements OnInit {

  @Input() value: number;

  constructor() { }

  ngOnInit() {
  }

  getColorNum(): string {
      switch (this.value) {
          case 1:
              return 'red';
          case 5:
              return 'orange';
          case 20:
              return 'yellow';
          case 50:
              return 'green';
          case 100:
              return 'blue';
          case 200:
              return 'indigo';
          case 500:
              return 'violet';
          case 1000:
              return 'gray';
          case 2000:
              return 'brown';
          case 5000:
              return 'black';
          default:
              return 'black';
      }
  }

}
