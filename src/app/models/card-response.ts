import {Card} from './card';

export class CardResponse {
    success: boolean;
    cards: Array<Card>;
    deck_id: string;
    remaining: string;

    constructor (cards, id, rem, suc = true) {
        this.cards = cards;
        this.deck_id = id;
        this.remaining = rem;
        this.success = suc;
    }
}
