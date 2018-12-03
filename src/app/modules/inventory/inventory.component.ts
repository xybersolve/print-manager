// angular imports
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 3rd party imports
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// service imports
import { InventoryService } from '../../core/http/inventory.service';
import { LocationService } from '../../core/http/location.service';
import { ActionService } from '../../core/http/action.service';
import { ConfigurationService } from '../../configs/configuration.service';

// model imports
import { IInventoryItem } from '../../core/models/inventory.model';
import { ILocation, ILocationBrief } from '../../core/models/location.model';
import { IAction } from '../../core/models/action.model';

@Component({
  // selector: 'pm-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  title = 'Inventory';
  inventory: IInventoryItem[] = [];
  filteredInventory: IInventoryItem[] = [];
  selectedInventory: IInventoryItem;
  selectedIdx: number;
  locations: ILocationBrief[] = [];
  _locationFilter: string;

  actions: IAction[] = [];
  _actionFilter: string;

  confirmSoldMessage: string;
  modalRef: BsModalRef;
  message: string;

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private locationService: LocationService,
    private actionService: ActionService,
    private config: ConfigurationService
  ) {
    this._locationFilter = config.defaults.location;
    this._actionFilter = config.defaults.action;
   }

  ngOnInit() {
    this.getInventory();
    this.getLocations();
    this.getActions();
  }

  // Filtering routines
  // location filter
  get locationFilter(): string {
    return this._locationFilter;
  }
  set locationFilter(value: string) {
    this._locationFilter = value;
    this.filterInventory();
  }
  // broken down criteria filters d
  private filterAction(item: IInventoryItem) {
    return this._actionFilter === 'All' ? true : item.action === this._actionFilter;
  }
  private filterLocation(item: IInventoryItem) {
    return this._locationFilter === 'All' ? true : item.location === this._locationFilter;
  }
  // sets filteredInventory array and returns it also
  private filterInventory(): IInventoryItem[] {
    return this.filteredInventory = this.inventory.filter(item => {
      return this.filterLocation(item) && this.filterAction(item);
    });
  }

  get actionFilter() {
    return this._actionFilter;
  }
  set actionFilter(value: string) {
    this._actionFilter = value;
    this.filterInventory();
  }

  // HTTP Rest calls
  private getInventory() {
    this.inventoryService.getAll()
      .subscribe(
        data => {
          this.inventory = data;
          this.filteredInventory = this.filterInventory();
        },
        err => console.error(err)
      );
  }

  private getLocations() {
    this.locationService.getAllBrief()
      .subscribe(
        data => this.locations = data,
        err => console.error(err)
      );
  }

  private getActions() {
    this.actionService.getAll()
      .subscribe(
        data => this.actions = data,
        err => console.error(err)
      );
  }

  createInvoice() {
    this.router.navigate(['/invoice', 'add']);
  }

  onSoldConfirm(inventory: IInventoryItem) {
    console.log('onSold');
    console.log(`message: ${inventory.name}, ${inventory.size}`);
    console.log(`inventory._id: ${inventory._id}`);
    // sold changes action from 'Delivered' to 'Sold'
    inventory.action = 'Sold';
    this.inventoryService.update(inventory)
      .subscribe(
        () => {},
        err => console.error(err),
        () => {
          // this.inventory.splice(this.selectedIdx, 1);
          this.modalRef.hide();
          this.getInventory();
        }
      );
  }

  onDeleteConfirm(inventory: IInventoryItem) {
    console.log('Deleting item');
    console.log(`Inventory: ${inventory.name}, ${inventory.size}. ${inventory._id}`);
    this.inventoryService.delete(inventory._id)
      .subscribe(
        () => {},
        err => console.error(err),
        () => {
          console.log(`deleting idx: ${this.selectedIdx}, id: ${inventory._id}`);
          // this.inventory.splice(this.selectedIdx, 1);
          this.modalRef.hide();
          this.getInventory();
        }
      );
  }

  // shared confirmation noop
  onDeclineNoop() {
    console.log('Got use abort');
    this.modalRef.hide();
  }

  // Confirmation Dialogs
  // Sold confirmation
  confirmSold(template: TemplateRef<any>, inventory: IInventoryItem, idx: number) {
    this.selectedInventory = inventory;
    this.selectedIdx = idx;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  // Delete confirmation
  confirmDelete(template: TemplateRef<any>, inventory: IInventoryItem, idx: number) {
    this.selectedInventory = inventory;
    this.selectedIdx = idx;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

}
