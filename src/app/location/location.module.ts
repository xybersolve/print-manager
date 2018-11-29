import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LocationComponent } from './location.component';
import { LocationDetailComponent } from './detail/location-detail.component';
import { LocationRoutingModule } from './location-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LocationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LocationComponent,
    LocationDetailComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LocationModule { }
