import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceComponent } from './invoice.component';
import { InvoiceDetailComponent } from './detail/invoice-detail.component';

const routes: Routes = [
  {
    path: 'invoice',
    component: InvoiceComponent
  }, {
    path: 'invoice/:id/edit',
    component: InvoiceDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
