import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// import { ImageComponent } from './image/image/image.component';
// import { InventoryComponent } from './inventory/inventory.component';
// import { LoginComponent } from './user/login.component';

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

// feature components
import { MessageComponent } from './message/message.component';
import { InventoryListComponent } from './inventory/list/inventory-list.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { LineComponent } from './line/line.component';
import { LineDetailComponent } from './line/detail/line-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    MessageComponent,
    InventoryListComponent,
    InvoiceComponent,
    LineComponent,
    LineDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InvoiceModule,
    InventoryModule,
    ImageModule,
    LineModule,
    UserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
