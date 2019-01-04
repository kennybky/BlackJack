import {Card} from './card';

export class CardResponse {
    success: Boolean;
    cards: Array<Card>;
    deck_id: string;
    remaining: string;
}
