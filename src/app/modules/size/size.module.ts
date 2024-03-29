import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SizeRoutingModule } from './size-routing.module';
import { SizeComponent } from './size.component';

@NgModule({
  imports: [
    CommonModule,
    SizeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SizeComponent
  ]
})
export class SizeModule { }
