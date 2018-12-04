import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AspectRatioRoutingModule } from './aspect-ratio-routing.module';
import { AspectRatioComponent } from './aspect-ratio.component';

@NgModule({
  imports: [
    CommonModule,
    AspectRatioRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AspectRatioComponent
  ]
})
export class AspectRatioModule { }
