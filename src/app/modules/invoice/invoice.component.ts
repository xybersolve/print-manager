import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { InvoiceService } from '../../core/http/invoice.service';
import { LocationService } from '../../core/http/location.service';
import { ActionService } from '../../core/http/action.service';

import { IInvoice } from '../../core/models/invoice.model';
import { ILocation } from '../../core/models/location.model';
import { IAction } from '../../core/models/action.model';


@Component({
  selector: 'pm-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  title = 'Invoices';
  invoices: IInvoice[] = [];
  filteredInvoices: IInvoice[] = [];
  locations: ILocation[] = [];
  _locationFilter = 'Many Hands Gallery';

  actions: IAction[] = [];
  _actionFilter = 'Delivered';

  constructor(
    private invoiceService: InvoiceService,
    private locationService: LocationService,
    private actionService: ActionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getLocations();
    this.getInvoices();
    this.getActions();
  }

  // Filtering routines
  // location filter
  get locationFilter(): string {
    return this._locationFilter;
  }
  set locationFilter(value: string) {
    this._locationFilter = value;
    this.filterInvoices();
  }
  private filterLocation(item: IInvoice) {
    return this._locationFilter === 'All' ? true : item.location === this._locationFilter;
  }

  // action filters
  get actionFilter() {
    return this._actionFilter;
  }
  set actionFilter(value: string) {
    this._actionFilter = value;
    this.filterInvoices();
    console.log(`actionFilter: ${this._actionFilter}`);
  }
  private filterAction(item: IInvoice) {
    return this._actionFilter === 'All' ? true : item.action === this._actionFilter;
  }

  // sets filteredInventory array and returns it also
  private filterInvoices(): IInvoice[] {
    return this.filteredInvoices = this.invoices.filter(item => {
      return this.filterLocation(item) && this.filterAction(item);
    });
  }


  // Http REST Routines
  private getInvoices() {
    this.invoiceService.getAll()
      .subscribe(
        data => {
          console.dir(data);
          this.invoices = data;
          this.filteredInvoices = this.filterInvoices();
        }
      );
  }
  private getLocations() {
    this.locationService.getAll()
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

  // External Event Responders
  public onAdd() {
    this.router.navigate(['/invoice', 'add']);
  }

  public onEdit(invoice: IInvoice) {
    this.router.navigate(['/invoice', invoice._id]);
  }

  public onRemove(invoice, idx) {
    console.log(`remove invoice: ${idx}`);
    console.dir(invoice);
    this.invoiceService.delete(invoice._id)
      .subscribe(
        () => {},
        err => console.error(err),
        () => this.invoices.splice(idx, 1)
      );
  }
}
