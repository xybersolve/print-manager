import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Material
/*
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'; */

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// support modules
import { BootstrapModule } from './modules/bootstrap/bootstrap.module';

// feature modules
import { InvoiceModule } from './modules/invoice/invoice.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { ImageModule } from './modules/image/image.module';
import { UserModule } from './modules/user/user.module';
import { LineModule } from './modules/line/line.module';
import { LocationModule } from './modules/location/location.module';

// feature components
import { MessageComponent } from './modules/message/message.component';
import { SizesComponent } from './modules/sizes/sizes.component';
import { SizeComponent } from './modules/size/size.component';
import { MaterialComponent } from './modules/material/material.component';
// import { InvoiceComponent } from './modules/invoice/invoice.component';
// import { InventoryListComponent } from './inventory/list/inventory-list.component';
// import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    // SidebarComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    MessageComponent,
    SizesComponent,
    SizeComponent,
    MaterialComponent
  ],
  imports: [
    BrowserModule,
    BootstrapModule,
    // BrowserAnimationsModule,
    // MatButtonModule,
    // MatIconModule,
    // MatSidenavModule,
    HttpClientModule,
    InvoiceModule,
    InventoryModule,
    ImageModule,
    LineModule,
    LocationModule,
    UserModule,
    AppRoutingModule,
  ],
  exports: [ ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
