import {Card} from './card';

export class GameCard {

    constructor(card: Card, flipped = true) {
this.card = card;
this.flipped = flipped;
    }

    card: Card;
    flipped: boolean;
    get number(): number {
        if (this.card.value === 'KING' || this.card.value === 'QUEEN' || this.card.value === 'JACK') {
            return 10;
        } else if (this.card.value === 'ACE') {
            return 11;
        } else {
            return parseInt(this.card.value, 10);
        }
    }
}
