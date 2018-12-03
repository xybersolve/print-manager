import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { InvoiceService } from '../../core/http/invoice.service';
import { LocationService } from '../../core/http/location.service';
import { IInvoice } from '../../core/models/invoice.model';
import { ILocation } from '../../core/models/location.model';
import { TouchSequence } from 'selenium-webdriver';

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
  _locationFilter = '';

  constructor(
    private invoiceService: InvoiceService,
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getLocations();
    this.getInvoices();
  }

  // location filter
  get locationFilter(): string {
    return this._locationFilter;
  }
  set locationFilter(value: string) {
    this._locationFilter = value;
    this.filteredInvoices = this.locationFilter ? this.filterInvoices() : this.invoices;
  }
  private filterInvoices(): IInvoice[] {
    return this.filteredInvoices = this.invoices.filter(invoice => {
      // console.log(`filterInvoices(),${this._locationFilter} = ${invoice.location.toLocaleLowerCase()}`);
      return this._locationFilter ? invoice.location === this._locationFilter : true;
    });
  }

  private getLocations() {
    this.locationService.getAll()
      .subscribe(
        data => this.locations = data,
        err => console.error(err)
      );
  }

  private getInvoices() {
    this.invoiceService.getAll()
      .subscribe(
        data => {
          console.dir(data);
          this.invoices = data;
          this.filteredInvoices = data;
        }
      );
  }
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
