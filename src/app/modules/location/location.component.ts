import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LocationService } from '../../core/http/location.service';
import { ILocation } from '../../core/models/location.model';

@Component({
  // selector: 'pm-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  locations: ILocation[] = [];
  filteredLocations: ILocation[] = [];
  _activeOnly: boolean;

  constructor(
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getLocations();
  }

  private getLocations() {
    this.locationService.getAll()
    .subscribe(
      data => {
        this.locations = data;
        this.filteredLocations = data;
      },
      err => console.error(err)
    );
  }

  private update(location: ILocation) {
    this.locationService.update(location)
    .subscribe(
      (data) => console.log(data),
      (err) => console.error(err)
    );
  }

  private setDefault(location: ILocation) {
    this.locationService.setDefault(location)
    .subscribe(
      (data) => console.log(data),
      (err) => console.error(err)
    );
  }

  private deleteLocation(location: ILocation) {
    this.locationService.delete(location._id)
    .subscribe(
      (data) => console.log(data),
      (err) => console.error(err)
    );
  }

  onRemove(location: ILocation, idx: number) {
    console.log('onRemove');
    this.deleteLocation(location);
  }

  onSetDefault(location: ILocation, idx: number) {
    console.log(`onMakeDefault: ${location.name}, ${idx}`);
    for (const l of this.locations) { l.default = false; }
    location.default = true;
    this.setDefault(location);
  }

  onChangeActive(location: ILocation) {
    this.update(location);
  }

  onAdd() {
    this.router.navigate(['location', '0', 'edit']);
  }

  onEdit(location: ILocation) {
    console.log('onEdit');
    this.router.navigate(['location', location._id, 'edit']);
  }

}
