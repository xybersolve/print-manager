import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationComponent } from './location.component';
import { LocationDetailComponent } from './detail/location-detail.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: LocationComponent
  // }, {
  {
    path: 'location',
    component: LocationComponent
  }, {
    path: 'location/:id/edit',
    component: LocationDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
