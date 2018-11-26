import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ImageRoutingModule } from './image-routing.module';
import { ImageComponent } from './image.component';
import { ImageDetailComponent } from './detail/image-detail.component';


@NgModule({
  imports: [
    CommonModule,
    ImageRoutingModule,
    FormsModule
  ],
  declarations: [
    ImageComponent,
    ImageDetailComponent
  ],
  exports: [
    FormsModule,
    ImageComponent,
    ImageDetailComponent
  ]
})
export class ImageModule { }
