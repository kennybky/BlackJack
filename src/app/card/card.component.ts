import {Component, Input, OnInit} from '@angular/core';
import {GameCard} from '../models/game-card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() gameCard: GameCard;

  public flipped = false as boolean;

  constructor() {
  }

  ngOnInit() {
  }

  symbols(s) {
const x = parseInt(s, 10);
if (isNaN(x)) {
  return new Array(1).fill(0);
} else {
  return new Array(x).fill(0);
}

  }

}
