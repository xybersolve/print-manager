import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { SortBySizePipe } from './sort-by-size.pipe';
import { TruncatePipe } from '../shared/pipes/truncate.pipe';
import { MaterialAcronymPipe } from '../shared/pipes/material.acronym.pipe';
import { SizeFormatPipe } from '../shared/pipes/size.format.pipe';

@NgModule({
  imports: [
    CommonModule,
    InvoiceRoutingModule
  ],
  declarations: [
    SortBySizePipe,
    TruncatePipe,
    MaterialAcronymPipe,
    SizeFormatPipe
  ],
  exports: [
    TruncatePipe,
    MaterialAcronymPipe,
    SizeFormatPipe
  ]
})
export class InvoiceModule { }
