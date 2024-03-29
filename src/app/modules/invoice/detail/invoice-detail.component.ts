// angular imports
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 3rd party imports
import { forkJoin } from 'rxjs';

// services
import { CommonService } from '../../../core/services/common.service';
import { ConfigurationService } from '../../../configs/configuration.service';
import { ImageService } from '../../../core/http/image.service';
import { SizeService } from '../../../core/http/size.service';
import { MaterialService } from '../../../core/http/material.service';
import { LocationService } from '../../../core/http/location.service';
import { InvoiceService } from '../../../core/http/invoice.service';
import { ActionService } from '../../../core/http/action.service';
import { AspectRatioService } from '../../../core/http/aspect-ratio.service';
import { MessageService } from '../../message/message.service';

// models
import { IImage } from '../../../core/models/image.model';
import { ISize } from '../../../core/models/size.model';
import { IAspectRatio } from '../../../core/models/aspect-ratio.model';
import { IMaterial } from '../../../core/models/material.model';
import { ILocation, ILocationBrief } from '../../../core/models/location.model';
import { IInvoice, IInvoiceItem } from '../../../core/models/invoice.model';
import { IAction } from '../../../core/models/action.model';


@Component({
  selector: 'pm-invoice',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {
  title = 'Invoice';
  images: IImage[] = [];
  filteredImages: IImage[] = [];
  sizes: ISize[] = [];
  filteredSizes: ISize[] = [];
  aspectRatios: IAspectRatio[] = [];
  materials: IMaterial[] = [];
  locations: ILocationBrief[] = [];
  actions: IAction[] = [];
  invoice: IInvoice;

  // template data holders (change detetection)
  // invoice item
  itemName: string = undefined;
  itemSize: string = undefined;
  itemMaterial: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private config: ConfigurationService,
    private common: CommonService,
    private imageService: ImageService,
    private sizeService: SizeService,
    private aspectRatioService: AspectRatioService,
    private materialService: MaterialService,
    private locationService: LocationService,
    private invoiceService: InvoiceService,
    private actionService: ActionService,
    private messageService: MessageService
  ) {}

  // size filter from aspect ratios
  _selectedAspectRatio = this.config.defaults.aspectRatio;
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

  selectedMaterial = this.config.defaults.material;
  get selectMaterial(): string {
    return this.selectedMaterial;
  }

  set selectMaterial(materialType: string) {
    this.selectedMaterial = materialType;
  }
  selectedLocation = this.config.defaults.location;
  get selectLocation(): string {
    return this.selectedLocation;
  }
  set selectLocation(locationName: string) {
    this.selectedLocation = locationName;
    this.invoice.location = locationName;
  }

  selectedAction = this.config.defaults.action;
  get selectAction(): string {
    return this.selectedAction;
  }
  set selectAction(actionType: string) {
    this.selectedAction = actionType;
    this.invoice.action = actionType;
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
    // instantiate invoice whether edit (with id) or new
    const id = this.route.snapshot.paramMap.get('id');
    if (id === '0') {
      this.title = 'Invoice Add';
      this.invoice = {
        _id: undefined,
        location: this.selectedLocation,
        date: this.getDate(),
        owner: this.common.owner,
        action: this.selectedAction,
        items: []
      };
    } else {
      this.title = 'Invoice Edit';
      this.getInvoice(id);
    }
    this.getAttrbuteData();
  }

  private getDate() {
    return new Date().toISOString().split('T')[0];
  }

  // get all image & invoice attribute data
  private getAttrbuteData() {
    forkJoin(
      this.imageService.getAll(),
      this.aspectRatioService.getAll(),
      this.sizeService.getAll(),
      this.materialService.getAll(),
      this.locationService.getAllBrief(),
      this.actionService.getAll()
    ).subscribe(
      results => {
        this.images = results[0];
        this.aspectRatios = results[1];
        this.sizes = results[2];
        this.materials = results[3];
        this.locations = results[4];
        this.actions = results[5];
      },
      (err => console.error(err)),
      () => {
        this.filteredImages = this.images;
        this.filteredSizes = this.filterSizes(this._selectedAspectRatio);
      }
    );
  }

  // only called on edit (id is present)
  private getInvoice(id: any) {
    this.invoiceService.get(id)
      .subscribe(
        data => this.invoice = data,
        err => console.error(err)
      );
  }

  // private removeInvoiceItem(item) {
  //   const idx = this.invoice.items.findIndex(i => {
  //     return i.size === item.size && i.name === item.name;
  //   });
  //   this.invoice.items.slice(idx);
  // }

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
        _id: undefined,
        invoiceId: undefined,
        location: this.invoice.location,
        date: this.invoice.date,
        owner: this.common.owner,
        action: this.selectedAction,
        material: this.selectedMaterial,
        name: this.itemName,
        size: this.itemSize
      }
    );
    this.invoice.items.sort(this.sortBySize);
    this.clearInvoiceItem();
    console.dir(this.invoice.items[this.invoice.items.length - 1]);
  }

  onRemoveItem(idx) {
    this.invoice.items.splice(idx, 1);
  }

  // clear invoice item to be added
  clearInvoiceItem() {
    this.itemName = undefined;
    this.itemSize = undefined;
  }

  // clear the current invoice
  onClearInvoice() {
    this.invoice.location = '';
    this.invoice.items = [];
  }

  isValidInvoice() {
    return this.invoice
           && this.invoice.items
           && this.invoice.items.length > 0
           && this.invoice.location
           && this.invoice.action
           && this.invoice.date;
  }

  isValidInvoiceItem() {
    return this.itemName
           && this.itemSize
           && this.selectedMaterial
           && this.selectedAction
           && this.selectedLocation;
  }

  onSaveInvoice() {
    // _id means we are editing exisiting record,
    // otherwise we are saving a new item
    if (this.invoice._id) {
      this.invoiceService.update(this.invoice).subscribe(
        () => {},
        err => console.error(err),
        () => this.onSaveComplete(`Invoice updated, for: ${this.invoice.location}`)
      );
    } else {
      // this.invoice.date = new Date().toString();
      this.invoiceService.add(this.invoice).subscribe(
        () => {},
        err => console.error(err),
        () => this.onSaveComplete(`Invoice added, for: ${this.invoice.location}`)
      );
    }
  }

  private onSaveComplete(msg: string) {
    this.messageService.addMessage(msg);
  }

}
