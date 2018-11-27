import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LineComponent } from './line.component';
import { LineDetailComponent } from './detail/line-detail.component';

const routes: Routes = [
  {
    path: 'line',
    component: LineComponent
  }, {
    path: 'line/add',
    component: LineDetailComponent
  }, {
    path: 'line/:id',
    component: LineDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LineRoutingModule { }
