import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChipComponent} from '../chip/chip.component';
import {CardComponent} from '../card/card.component';
import {CardValueDirective} from '../card-value.directive';

@NgModule({
  declarations: [ChipComponent, CardComponent, CardValueDirective],
  imports: [
    CommonModule,
  ],
  exports: [ChipComponent, CardComponent, CardValueDirective]
})
export class SharedModule { }
