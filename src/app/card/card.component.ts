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

  constructor() { }

  ngOnInit() {
  }

}
