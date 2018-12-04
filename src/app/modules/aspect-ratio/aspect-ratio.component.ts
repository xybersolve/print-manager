import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AspectRatioService } from '../../core/http/aspect-ratio.service';
import { IAspectRatio } from '../../core/models/aspect-ratio.model';

@Component({
  selector: 'pm-aspect-ratio',
  templateUrl: './aspect-ratio.component.html',
  styleUrls: ['./aspect-ratio.component.css']
})
export class AspectRatioComponent implements OnInit {
  ratios: IAspectRatio[] = [];
  filteredRatios: IAspectRatio[] = [];

  _activeOnly: any;

   constructor(
    private aspectRatioService: AspectRatioService
  ) { }

  ngOnInit() {
    this.getAll();
  }

  private getAll() {
    this.aspectRatioService.getAll()
      .subscribe(
        data => {
          console.dir(data);
          this.ratios = data;
          this.filteredRatios = data;
        },
        err => console.error(err)
      );
  }

  private update(ratio: IAspectRatio) {
    this.aspectRatioService.update(ratio)
    .subscribe(
      (data) => console.log(data),
      (err) => console.error(err)
    );
  }

  private setDefault(ratio: IAspectRatio) {
    this.aspectRatioService.setDefault(ratio)
    .subscribe(
      (data) => console.log(data),
      (err) => console.error(err)
    );
  }

  get activeOnly(): any {
    return this._activeOnly;
  }
  set activeOnly(value: any) {
    this._activeOnly = !! value;
    this.filterRatios();
  }

  filterRatios(): IAspectRatio[] {
    return this.filteredRatios = this.ratios.filter(ratio => {
      return this._activeOnly ? ratio.active === true : this.ratios;
    });
  }
  onAdd() {
    console.log('onAdd()');
  }
  onEdit(ratio: IAspectRatio) {
    console.log('onEdit()');
  }
  onRemove(ratio: IAspectRatio) {
    console.log('onRemove()');
  }
  onSetDefault(ratio: IAspectRatio, idx: number) {
    for (const r of this.ratios) { r.default = false; }
    ratio.default = true;
    this.setDefault(ratio);
  }
  onChangeActive(ratio: IAspectRatio) {
    this.update(ratio);
  }
}
