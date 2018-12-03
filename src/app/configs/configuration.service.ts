import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  baseRestUrl = 'http://localhost:7070/api/v1';
  defaults = {
    aspectRatio: '2:3',
    owner: 'Greg Milligan',
    action: 'Stock',
    location: 'Many Hands Gallery',
    material: 'Metal Print'
  };
  constructor() { }
}
