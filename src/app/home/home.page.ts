import { Component } from '@angular/core';
import {CardService} from '../services/card.service';
import {Deck} from '../models/deck';
import {Card} from '../models/card';
import {GameCard} from '../models/game-card';
import {DeckService} from '../services/deck.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

decks = [] as any;
currentDeck: any;
drawn = [] as any;

current: GameCard;
  constructor(private deck: DeckService) {
    this.initialize();
  }

  initialize() {
    const deck = this.deck.getShuffledDeck();
    this.decks.push(deck);
    this.currentDeck = deck;
    const cur = this.drawCard(deck);
    const gameCard = new GameCard(cur, true);
    this.current = gameCard;
  }

  drawCard(deck: Deck): Card {
    const result = this.deck.drawCard(deck.deck_id);
    return result.cards[0];
  }

}
