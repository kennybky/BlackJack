import { Component } from '@angular/core';
import {CardService} from '../services/card.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(private card: CardService) {
    this.initialize();
  }

  async initialize() {
    const deck = await this.card.getNewDeck();
    console.log(deck.deck_id);
  }
}
