import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AspectRatioComponent} from '../../modules/aspect-ratio/aspect-ratio.component';

const routes: Routes = [
  {
    path: 'aspect-ratio',
    component: AspectRatioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AspectRatioRoutingModule { }
