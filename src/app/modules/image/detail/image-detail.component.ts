import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ImageService } from '../../../core/http/image.service';
import { LineService } from '../../../core/http/line.service';

import { IImage } from '../../../core/models/image.model';
import { ILine, ILineBrief } from '../../../core/models/line.model';


@Component({
  // selector: 'pm-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {
  // debug form data
  showFormDebug = true;
  title = 'Image';
  _id: any;
  image = new IImage();
  lines: ILineBrief[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private imageService: ImageService,
              private lineService: LineService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.title = id !== '0' ? 'Image Edit' : 'Image Add';
    if (id !== '0') {
      this.getImage(id);
    }
    this.getLines();
  }

  private getImage(id: any): void {
    console.log(`getImage(): ${id}`);
    this.imageService.get(id).subscribe(
      (image: IImage) => this.image = image,
      (err) => console.error(err)
    );
  }

  private getLines() {
    this.lineService.getAllBrief().subscribe(
      (data) => this.lines = data,
      (err) => console.error(err)
    );
  }

  private updateImage(image): void {
    // split between add new and update existing
    if (image._id === 0) {
      this.imageService.add(image)
        .subscribe(
          (data) => this.image = data,
          (err) => console.error(err)
        );
    } else {
      // console.log('imageDetail.updateImate()'); console.dir(image);
      this.imageService.update(image)
        .subscribe(
          data => console.log(data),
          err => console.error(err)
        );
    }
    // back to image list
    this.router.navigate(['/image']);
  }

  onSubmit(formImage: any, imageDetailForm: NgForm) {
    // turn form data into object data and submit
    console.log('imageDetailForm:');
    // throws circular structure error
    // console.log(JSON.stringify(imageDetailForm));
    const image = <IImage>formImage;
    console.log(image);
    this.updateImage(image);
  }
}
