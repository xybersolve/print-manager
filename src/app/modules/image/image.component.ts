import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { forkJoin } from 'rxjs';

import { ImageService } from '../../core/http/image.service';
import { LineService } from '../../core/http/line.service';

import { IImage } from '../../core/models/image.model';
import { ILine, ILineBrief } from '../../core/models/line.model';


@Component({
  // selector: 'pm-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  images: IImage[] = [];
  filteredImages: IImage[] = [];
  lines: ILineBrief[] = [];
  _activeOnly = false;
  _imageFilter = '';
  _lineFilter = 'All';

  private calls = {
    image: 0,
    lines: 1
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private imageService: ImageService,
    private lineService: LineService
  ) { }

  public ngOnInit() {
    // this.getImages();
    // this.getLines();
    this.getData();
  }
  // active only filter
  get activeOnly(): boolean {
    return this._activeOnly;
  }
  set activeOnly(value: boolean) {
    this._activeOnly = !!value;
    this.filterImages();
  }

  // image filter
  get imageFilter(): string {
    return this._imageFilter.toLocaleLowerCase();
  }
  set imageFilter(value: string) {
    this._imageFilter = value.toLocaleLowerCase();
    this.filterImages();
  }
  // line filter
  get lineFilter() {
    return this._lineFilter;
  }
  set lineFilter(value: any) {
    this._lineFilter = value;
    this.filterImages();
  }

  private filterImages() {
    this.filteredImages = this.images.filter(image => {
      // to get correct boolean logic, must be broken into separate distinct logical units
      return ( this._imageFilter ? image.name.toLocaleLowerCase().indexOf(this._imageFilter) !== -1 : true ) &&
             ( this._lineFilter ? (this._lineFilter === 'All' || image.line === this._lineFilter) : true ) &&
             ( this._activeOnly ? image.active === true : true );
    });
  }

  private getData() {
    forkJoin(
      this.imageService.getAll(),
      this.lineService.getActiveBrief()
    ).subscribe(results => {
        this.images = results[0];
        this.lines = results[1];
      },
      err => console.error(err),
      () => this.lineFilter = this.lines.find(line => line.default === true).name || 'All'
    );
  }

  private deleteImage(id: string) {
    console.log('delete image');
    this.imageService
        .delete(id)
        .subscribe(
          (data => console.log(data)),
          (err) => console.error(err)
        );
  }
  private sortByKey(key: string) {
    return (a, b) => {
      return a[key] - b[key];
    };
  }

  private sortByKeyNumeric(key: string) {
    return (a, b) => {
      const aNum = +a[key];
      const bNum = +b[key];
      return aNum - bNum;
    };
  }

  private updateImage(image) {
    // console.log('Update image'); console.dir(image);
    this.imageService.update(image)
      .subscribe(
        (data) => console.log(data),
        (err) => console.error(err)
      );
  }

  public onClearImageFilter() {
    this.imageFilter = '';
  }

  public onEditImage(image, idx) {
    // console.log(`edit - _id: ${image._id}, id: ${image.id}, idx: ${idx}`);
    this.router.navigate(['/image', image._id ]);
  }

  public onRemoveImage(image, idx) {
    const response = confirm(`Are you sure you want to delete: ${image.name}`);
    if (response === true) {
      this.deleteImage(image._id);
      this.images.splice(idx, 1);
      this.filterImages(); // update the fitlered images
    }
    // console.log(`response: ${response}`);
  }

  public onChangeActive(image) {
    // console.log('got onChangeActive()');
    this.updateImage(image);
  }

  public onAddImage() {
    // console.log('got onAddImage();');
    this.router.navigate(['/image', 'add']);
  }

}
