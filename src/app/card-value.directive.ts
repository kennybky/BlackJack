import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appCardValue]'
})
export class CardValueDirective implements OnInit {

  @Input() cardValue: any;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    console.log(this.cardValue);
    this.el.nativeElement.setAttribute('value', this.cardValue);
  }

}
