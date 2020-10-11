export class Card {
    value: any;
    suit: string;
    code: string;
    image: string;

    constructor(value, suit, code) {
        this.value = value;
        this.suit = suit;
        this.code = code;
    }
}
