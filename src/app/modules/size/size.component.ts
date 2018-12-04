import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SizeService } from '../../core/http/size.service';
import { ISize, IAspectRatio } from '../../core/models/size.model';

@Component({
  // selector: 'pm-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent implements OnInit {
  sizes: ISize[] = [];
  filteredSizes: ISize[] = [];
  aspectRatios: IAspectRatio[] = [];
  _activeOnly: boolean;

   constructor(
    private sizeService: SizeService
  ) { }

  ngOnInit() {
    this.getAll();
    this.getAspectRatios();
  }

  get activeOnly(): boolean {
    return this._activeOnly;
  }
  set activeOnly(value: boolean) {
    this._activeOnly = !!value;
    this.filterSizes();
  }
  private filterSizes() {
    return this.filteredSizes = this.sizes.filter(size => {
      return this._activeOnly ? size.active === true : true;
    });
  }

  private getAll() {
    this.sizeService.getAll()
      .subscribe(
        data => {
          console.dir(data);
          this.sizes = data;
          this.filteredSizes = data;
        },
        err => console.error(err)
      );
  }

  private getAspectRatios() {
    this.sizeService
      .getApectRatios()
      .subscribe(
        (data: IAspectRatio[]) => this.aspectRatios = data,
        (err: any) => console.error(err)
      );
  }

  private update(size: ISize) {
    this.sizeService.update(size)
      .subscribe(
        (data) => console.log(data),
        (err) => console.error(err)
      );
  }
  onAdd() {
    console.log('onAdd()');
  }
  onEdit(size: ISize) {
    console.log('onEdit()');
  }
  onRemove(size: ISize) {
    console.log('onRemove()');
  }
  onChangeActive(size: ISize) {
    this.update(size);
  }
}
