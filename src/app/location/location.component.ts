import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ILocation } from '../shared/models/location.model';

import { LocationService } from '../shared/services/location.service';

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

  public onRemove(location: ILocation, idx: number) {
    console.log('onRemove');
  }

  public onEdit(location: ILocation) {
    console.log('onEdit');
    this.router.navigate(['location', location._id]);
  }

}
