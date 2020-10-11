import { Component, OnInit } from '@angular/core';
import {CardService} from '../services/card.service';
import {Deck} from '../models/deck';
import {Card} from '../models/card';
import {GameCard} from '../models/game-card';
import {DeckService} from '../services/deck.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

 decks = [] as Array<Deck>;
 currentDeck: any;

denum = [1, 5, 20, 50, 100, 200, 500, 1000, 2000, 5000];
 drawn = [];
 dealerCards  = [] as GameCard[];
 playerCards = [] as GameCard[];
 playerScore = 0 as number;
 dealerScore = 0 as number;
 playerStand = false as boolean;
 dealerStand = false as boolean;
 dealerMoney: number;
 playerMoney: number;
 betAmt = 5;
 betLocked: boolean;
    protected playerBet: number;

    constructor(private deck: DeckService) {
        this.initialize();
    }

    async initialize() {
        const deck = this.deck.getShuffledDeck();
        this.decks.push(deck);
        this.currentDeck = deck;
        this.playerMoney = 1000;
    }

    async draw() {
    const result = this.deck.drawCard(this.currentDeck.deck_id);
    result.cards.forEach((card) => {
        this.drawn.push(card);
    });
    }

    async drawCard(deck: Deck): Promise<Card> {
        const result = this.deck.drawCard(deck.deck_id);
        return result.cards[0];
    }

   async startGame() {
        this.dealerCards = [];
        this.playerCards = [];
        const deck = this.deck.getShuffledDeck();
        this.decks.push(deck);
        this.currentDeck = deck;
       await this.dealToDealer(2, 1);
        await this.dealToPlayer(2);
        this.watchGame();
    }

    async playerPlay() {
        await this.dealToPlayer();
        this.watchGame();
    }


     async dealToPlayer(n = 1, flip = 0) {
         const result = this.deck.drawCard(this.currentDeck.deck_id, n);
         result.cards.forEach((card) => {
             let flipped = true;
             if (flip > 0) {
                 flipped = false;
                 flip--;
             }
             const gameCard = new GameCard(card, flipped);
            this.playerCards.push(gameCard);
            this.updatePlayerScore(gameCard);
         });
    }

   async dealToDealer(n = 1, flip = 0) {
       const result = this.deck.drawCard(this.currentDeck.deck_id, n);
       result.cards.forEach((card) => {
           let flipped = true;
           if (flip > 0) {
               flipped = false;
               flip--;
           }
           const gameCard = new GameCard(card, flipped);
           this.dealerCards.push(gameCard);
           if (flipped) {
               this.updateDealerScore(gameCard);
           }
       });
    }

    async dealerPlay() {
        this.playerStand = true;
        this.dealerCards.forEach((gameCard) => {
            if (!gameCard.flipped) {
                gameCard.flipped = true;
                this.updateDealerScore(gameCard);
            }
        });
        await this.delay(1000);
        if (this.dealerScore >= 17 && (this.dealerScore >= this.playerScore || this.playerScore > 21)) {
            this.dealerStand = true;
        }
        this.watchGame();
        let done = this.dealerStand;
        const play = setInterval(() => {
            if (done) {
                clearInterval(play);
            } else {
                this.dealToDealer().then(() => {
                    this.watchGame();
                    done = this.dealerStand;
                    if (!done) {
                        if (this.dealerScore >= 17 && (this.dealerScore >= this.playerScore || this.playerScore > 21)) {
                            this.dealerStand = true;
                            done = true;
                            this.watchGame();
                        }
                    }
                });
            }
        }, 1500);
    }

    watchGame() {
        if (this.playerStand && this.dealerStand) {
            let winner = 'dealer';
            if (this.playerScore === 21 && this.dealerScore !== 21 ) {
                winner = 'player';
            } else if (this.dealerScore === 21 && this.playerScore !== 21) {
                winner = 'dealer';
            } else if (this.playerScore === this.dealerScore) {
                winner = 'draw';
            } else if (this.playerScore > 21 && this.dealerScore > 21) {
                    winner = this.playerScore < this.dealerScore ? 'player' : 'dealer';
                } else if (this.playerScore > 21 && this.dealerScore < 21) {
                winner = 'dealer';
            } else if (this.playerScore < 21 && this.dealerScore > 21) {
                winner = 'player';
            } else if (this.playerScore < 21 && this.dealerScore < 21) {
                winner = this.playerScore > this.dealerScore ? 'player' : 'dealer';
            }
            // do winner
            this.endGame(winner);
        } else {
            if (this.playerScore >= 21 && !this.playerStand) {
                this.dealerPlay();
            } else if (this.dealerScore >= 21 && !this.dealerStand) {
                this.dealerStand = true;
                this.watchGame();
            }
        }
    }

    endGame(winner) {
        // do something with the winner;
        console.log(winner);
        if (winner === 'player') {
            this.playerMoney += (this.playerBet * 2);
        } else if (winner === 'draw') {
            this.playerMoney += this.playerBet;
        }
    }

    bet(amount: number) {
       this.betAmt = 0;
       this.betLocked = true;
       this.playerBet = amount;
       this.playerMoney -= amount;
       this.startGame();
    }

    awardChip(amount: number): Array<number> {
        if (amount === 0) {
            return [];
        } else if (amount === 1) {
            return [1];
        } else if (amount === 5) {
            return [5];
        } else {
           for (let i = this.denum.length - 1; i >= 0; i--) {
               if (this.denum[i] <= amount) {
                   const balance = amount - this.denum[i];
                  return [this.denum[i]].concat(this.awardChip(balance));
               }
           }
        }
    }

    reset() {
        this.playerScore = 0;
        this.dealerScore =  0;
        this.playerStand = false;
        this.dealerStand = false;
        this.playerCards = [];
        this.dealerCards = [];
        this.playerBet = 0;
        this.betLocked = false;
    }

   updatePlayerScore(gameCard: GameCard) {
    this.playerScore += gameCard.number;
    if (this.playerScore > 21) {
        for (let i = 0; i < this.playerCards.length; i++) {
            const card =  this.playerCards[i];
            if (card.card.value === 'ACE') {
                card.card.value = '1';
                this.playerCards[i] = card;
                this.playerScore -= 10;
                break;
            }
        }
    }
   }

   updateDealerScore(gameCard: GameCard) {
       this.dealerScore += gameCard.number;
       if (this.dealerScore > 21) {
           for (let i = 0; i < this.dealerCards.length; i++) {
               const card =  this.dealerCards[i];
               if (card.card.value === 'ACE' && card.flipped) {
                   card.card.value = '1';
                   this.dealerCards[i] = card;
                   this.dealerScore -= 10;
                   break;
               }
           }
       }
   }

    get playerValue() {
       return 0;
    }

    cardStyle(i: number = 0) {
        return (i * 3);
    }

    async delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

  ngOnInit() {
  }

}
