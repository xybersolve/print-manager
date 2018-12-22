import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageComponent } from './image.component';
import { ImageDetailComponent } from './detail/image-detail.component';

const routes: Routes = [
  {
    path: 'image', // image list
    component: ImageComponent
  }, {
    path: 'image/:id/edit',  // image edit or add
    component: ImageDetailComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageRoutingModule { }
