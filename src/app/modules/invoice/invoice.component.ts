import { Component, OnInit } from '@angular/core';


import { ImageService } from '../../core/http/image.service';
import { SizeService } from '../../core/http/size.service';
import { MaterialService } from '../../core/http/material.service';
import { LocationService } from '../../core/http/location.service';
import { InvoiceService } from '../../core/http/invoice.service';

import { IImage } from '../../core/models/image.model';
import { ISize, IAspectRatio } from '../../core/models/size.model';
import { IMaterial } from '../../core/models/material.model';
import { ILocation, ILocationBrief } from '../../core/models/location.model';
import { IInvoice, IInvoiceItem } from '../../core/models/invoice.model';

// import { TruncatePipe } from '../shared/pipes/truncate.pipe';
// import { IInvoice, IInvoiceItem } from '../shared/models/invoice.model';
// import { tap } from '../../../node_modules/rxjs/operators';

@Component({
  selector: 'pm-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  // images
  images: IImage[] = [];
  filteredImages: IImage[] = [];
  // selectedImages: IImage[] = [];

  // sizes and aspect ratios
  sizes: ISize[] = [];
  filteredSizes: ISize[] = [];
  aspectRatios: IAspectRatio[] = [];

  // materials
  materials: IMaterial[] = [];
  selectedMaterial =  'Metal Print';

  // locations
  locations: ILocationBrief[] = [];
  selectedLocation: 'Many Hands';

  invoice: IInvoice;

  // template data holders (change detetction)
  // invoice item
  itemName: string = undefined;
  itemSize: string = undefined;
  itemMaterial: string;

  // items: IInvoiceItem[] = [];
  // id: undefined,
  // invoiceId: undefined,
  // name: this.itemName,
  // location: this.selectedLocation,
  // material: this.selectedMaterial,
  // size: this.itemSize


  constructor(
    private imageService: ImageService,
    private sizeService: SizeService,
    private materialService: MaterialService,
    private locationService: LocationService,
    private invoiceService: InvoiceService
  ) {}

  // size filter from aspect ratios
  _selectedAspectRatio = '2:3';
  get ratioFilter(): string {
    return this._selectedAspectRatio;
  }

  set ratioFilter(value: string) {
    this._selectedAspectRatio = value;
    // filter image sizes based on selected aspect ratio
    this.filteredSizes = this.filterSizes(this._selectedAspectRatio);
  }

  // image filter
  _imageFilter = '';
  get imageFilter(): string {
    return this._imageFilter;
  }
  set imageFilter(value: string) {
    this._imageFilter = value;
    this.filteredImages = this.imageFilter ? this.filterImages(this.imageFilter) : this.images;
  }

  private filterSizes(filterBy: string) {
    return this.sizes.filter(size => size.ratio === filterBy);
  }

  private filterImages(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.images.filter((image: IImage) => {
      return image.name.toLocaleLowerCase().indexOf(filterBy) !== -1;
    });
  }

  ngOnInit() {
    this.getAllImages();
    this.getAspectRatios();
    this.getAllSizes();
    this.getMaterials();
    this.getLocations();
    this.invoice = {
      id: undefined,
      location: undefined,
      date: undefined,
      items: []
    };
  }

  // calls to data services
  private getAllImages() {
    this.imageService
    .getAll()
    .subscribe(
      (data: IImage[]) => {
        this.images = data;
        this.filteredImages = data;
      },
      (err: any) => console.error(err)
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

  private getAllSizes() {
    this.sizeService
      .getAll()
      .subscribe(
        (data: ISize[]) => {
          this.sizes = data;
          this.filteredSizes = this.filterSizes(this._selectedAspectRatio);
        },
        (err: any) => console.error(err)
    );
  }

  private getMaterials() {
    this.materialService
      .getAll()
      .subscribe(
        (data: IMaterial[]) => this.materials = data,
        (err: any) => console.error(err)
      );
  }

  private getLocations() {
    this.locationService
      .getAllBrief()
      .subscribe(
        (data: ILocationBrief[]) => this.locations = data,
        (err: any) => console.error(err)
      );
  }

  private removeInvoiceItem(item) {
    const idx = this.invoice.items.findIndex(i => {
      return i.size === item.size && i.name === item.name;
    });
    this.invoice.items.slice(idx);
  }

  // clear the image filter
  clearImageFilter() {
    this.imageFilter = '';
  }

  onSizeSelection(size) {
    this.itemSize = size;
  }

  onImageSelection(name) {
    // console.log(`onImageSelection: ${name}`);
    this.itemName = name;
  }

  private sortBySize(a, b) {
   // split off first size digit and sort by that (hieght)
   const aNum = +a['size'].split('x')[0].trim();
   const bNum = +b['size'].split('x')[0].trim();
   return aNum - bNum;
  }

  onItemAdd() {
    console.log('add item');
    this.invoice.items.push(
      {
        id: undefined,
        invoiceId: undefined,
        location: undefined,
        name: this.itemName,
        size: this.itemSize,
        material: this.selectedMaterial
      }
    );
    this.invoice.items.sort(this.sortBySize);
    this.clearInvoiceItem();
    console.dir(this.invoice.items[this.invoice.items.length - 1]);
  }

  onRemoveItem(idx) {
    console.log(`remove item by idx ${idx}`);
    // this.removeInvoiceItem(item);
    this.invoice.items.splice(idx, 1);
  }

  // clear invoice item to be added
  clearInvoiceItem() {
    this.itemName = undefined;
    this.itemSize = undefined;
  }

  // clear the current invoice
  clearInvoice() {
    this.invoice.location = '';
    this.invoice.items = [];
  }

  isValidInvoice() {
    return this.invoice.items
           && this.invoice.items.length > 0
           && this.invoice.location;
  }

  isValidInvoiceItem() {
    return this.itemName
           && this.itemSize
           && this.selectedMaterial;
  }

  saveInvoice() {
    console.log('save invoice');
    // this.invoice.location = this.selectedLocation;
    // this.invoice.items = this.invoiceItems;
    this.invoice.date = new Date().toString();
    this.invoiceService.save(this.invoice);
  }


}
