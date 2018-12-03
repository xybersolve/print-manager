import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SizeComponent } from './size.component';

const routes: Routes = [
  {
    path: 'size',
    component: SizeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SizeRoutingModule { }
