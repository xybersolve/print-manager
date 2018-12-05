// angular
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

// 3rd party
import { forkJoin } from 'rxjs';

// services
import { SizeService } from '../../core/http/size.service';
import { AspectRatioService } from '../../core/http/aspect-ratio.service';

// models
import { ISize} from '../../core/models/size.model';
import { IAspectRatio } from '../../core/models/aspect-ratio.model';

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
    private sizeService: SizeService,
    private aspectRatioService: AspectRatioService
  ) { }

  ngOnInit() {
    this.getData();
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

  private getData() {
    forkJoin(
      this.sizeService.getAll(),
      this.aspectRatioService.getAll()
    ).subscribe(results => {
      this.sizes = results[0];
      this.aspectRatios = results[1];
    },
    err => console.error(err),
    () => {
      this.filteredSizes = this.sizes;
    });
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
