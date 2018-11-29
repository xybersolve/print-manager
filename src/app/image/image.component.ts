import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ImageService } from '../shared/services/image.service';

import { IImage } from '../shared/models/image.model';

@Component({
  // selector: 'pm-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  images: IImage[] = [];
  filteredImages: IImage[] = [];
  _activeOnly = false;
  _imageFilter = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private imageService: ImageService
  ) { }

  public ngOnInit() {
    this.getAllImages();
  }

  get activeOnly(): boolean {
    return this._activeOnly;
  }
  set activeOnly(value: boolean) {
    console.log(`got activeOnly: ${value}`);
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

  private filterImages() {
    console.log(`filterImages(): ${this._activeOnly}, ${this._imageFilter}`);
    this.filteredImages = this.images.filter(image => {
      return this._imageFilter ? image.name.toLocaleLowerCase().indexOf(this._imageFilter) !== -1 : true &&
             this._activeOnly ? image.active === true : true;
    });
  }

  private getAllImages() {
    this.imageService
      .getAll()
      .subscribe(
        (data: IImage[]) => {
          this.images = data;
          this.filteredImages = data;
        },
        (err) => console.error(err)
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
