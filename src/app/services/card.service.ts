import { Injectable } from '@angular/core';
import url from '../data/urls';
import {HttpClient} from '@angular/common/http';
import {Deck} from '../models/deck';
import {CardResponse} from '../models/card-response';
import {Card} from '../models/card';
import {DeckService} from './deck.service';


@Injectable({
    providedIn: 'root'
})
export class CardService {



    constructor(private http: HttpClient, private deck: DeckService) { }


    getShuffledDeck (count = 1): Promise<Deck> {
        return this.http.get<Deck>(`${url.base}/deck/new/shuffle/?deck_count=${count}`).toPromise();
    }

    getNewDeck(shuffle = false, count = 1): Promise<Deck> {
        return this.http.get<Deck>(`${url.base}/deck/new/`).toPromise();
    }



    drawCard(deck: string, count = 1): Promise<CardResponse> {
        return this.http.get<CardResponse>(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=${count}`).toPromise();
    }

    shuffle(deck: string): Promise<Deck> {
        return this.http.get<Deck>(`https://deckofcardsapi.com/api/deck/${deck}/shuffle/`).toPromise();
    }




}
