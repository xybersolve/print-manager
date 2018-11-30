import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { LineComponent } from './line.component';
import { LineDetailComponent } from './detail/line-detail.component';
import { LineRoutingModule } from './line-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LineRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LineComponent,
    LineDetailComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    LineComponent,
    LineDetailComponent
  ]
})
export class LineModule { }
