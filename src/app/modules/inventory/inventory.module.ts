import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BootstrapModule } from '../../modules/bootstrap/bootstrap.module';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';

import { from } from 'rxjs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BootstrapModule,
    InventoryRoutingModule
  ],
  declarations: [
    InventoryComponent
  ]
})
export class InventoryModule { }
