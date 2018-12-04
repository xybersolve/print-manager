import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MaterialService } from '../../core/http/material.service';
import { IMaterial } from '../../core/models/material.model';
import { IAspectRatio } from 'src/app/core/models/aspect-ratio.model';

@Component({
  // selector: 'pm-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  materials: IMaterial[] = [];
  filteredMaterials: IMaterial[] = [];

  _activeOnly: any;

   constructor(
    private materialService: MaterialService
  ) { }

  ngOnInit() {
    this.getAll();
    // this.getAspectRatios();
  }

  private getAll() {
    this.materialService.getAll()
      .subscribe(
        data => {
          console.dir(data);
          this.materials = data;
          this.filteredMaterials = data;
        },
        err => console.error(err)
      );
  }

  private setDefault(material: IMaterial) {
    this.materialService.setDefault(material)
    .subscribe(
      (data) => console.log(data),
      (err) => console.error(err)
    );
  }

  private update(material: IMaterial) {
    this.materialService.update(material)
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
    this.filterMaterials();
  }

  filterMaterials(): IMaterial[] {
    return this.filteredMaterials = this.materials.filter(material => {
      return this._activeOnly ? material.active === true : this.materials;
    });
  }

  onAdd() {
    console.log('onAdd()');
  }
  onEdit(material: IMaterial) {
    console.log('onEdit()');
  }
  onRemove(material: IMaterial) {
    console.log('onRemove()');
  }
  onSetDefault(material: IMaterial, idx: number) {
    console.log(`onMakeDefault: ${material.material}, ${idx}`);
    for (const m of this.materials) { m.default = false; }
    material.default = true;
    this.setDefault(material);
  }
  onChangeActive(material: IMaterial) {
    // console.log(`material.active: ${material.active}`);
    this.update(material);
  }
}
