import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialRoutingModule } from './material-routing.module';
import { MaterialComponent } from './material.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    MaterialComponent
  ]
})
export class MaterialModule { }
