import { Injectable } from '@angular/core';
import {Card} from '../models/card';
import {Deck} from '../models/deck';
import {CardResponse} from '../models/card-response';



class DeckState {
  deck: Deck;
  cards: Card[];
}

@Injectable({
  providedIn: 'root'
})
export class DeckService {


  constructor() {
    this.numbers.forEach((n) => {
      this.suits.forEach((s) => {
        let code: string;
        if (typeof n === 'string') {
          code = `${n.charAt(0)}${s.charAt(0)}`;
        } else {
          code = `${n}${s.charAt(0)}`;
        }

        const card = new Card(n, s, code);
        this.cards.push(card);
      });
    });
  }

  cards = [] as Card[];
  numbers = ['ACE', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'JACK', 'QUEEN', 'KING'];
  suits = ['SPADES', 'HEARTS', 'DIAMONDS', 'CLUBS'];

  decks: { [key: string]: DeckState; } = {};

  static randomId(): string {
const randX  = Math.floor(Math.random() * 100);
const randY = Math.floor(Math.random() * 10);
const time = new Date().toISOString().substr(4);
return randX + '' + time + '' + randY;

  }



  getNewDeck(shuffle = false, count = 1): Deck {
    const deck = new Deck();
    deck.deck_id  = DeckService.randomId();

    let cards = [];

    for (let i = 0; i < count; i++) {
      cards = cards.concat(this.cards);
    }

    if (shuffle) {
      this.shuffleCards(cards);
    }
    deck.remaining = cards.length;
    deck.shuffled =  shuffle;
    deck.success = cards.length > 0;

    const state = new DeckState();
    state.deck = deck;
    state.cards = cards;
    this.decks[deck.deck_id] = state;
    return deck;
  }

  getShuffledDeck(count = 1): Deck {
    return this.getNewDeck(true, count);
  }

  shuffleDeck(id: string): Deck {
    this.shuffle(this.decks[id].cards);
    const deck = this.decks[id].deck;
    deck.shuffled = true;
    deck.remaining = this.decks[id].cards.length;
    deck.success = this.decks[id].cards.length > 0;
    return deck;
  }

  drawCard(deck_id: string, count = 1): CardResponse {
const cards = this.decks[deck_id].cards.splice(0, count);
    const deck = this.decks[deck_id].deck;
    deck.remaining = this.decks[deck_id].cards.length;
    return new CardResponse(cards, deck_id, deck.remaining);
  }

  clearDecks () {
    this.decks = {};
  }


  shuffleCards(cards: Card[], times = 3) {
    for (let i = 0; i < times; i++) {
      this.shuffle(cards);
    }
  }
  shuffle = (a: any[]) => a.sort(() => Math.random() - 0.5);
}
