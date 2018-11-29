import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// feature modules
import { InvoiceModule } from './invoice/invoice.module';
import { InventoryModule } from './inventory/inventory.module';
import { ImageModule } from './image/image.module';
import { UserModule } from './user/user.module';
import { LineModule } from './line/line.module';
import { LocationModule } from './location/location.module';

// feature components
import { MessageComponent } from './message/message.component';
import { InventoryListComponent } from './inventory/list/inventory-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    SidebarComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    MessageComponent,
    InventoryListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
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
