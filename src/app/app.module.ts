import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// root level components
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
import { SizeModule } from './modules/size/size.module';
import { MaterialModule } from './modules/material/material.module';
import { AspectRatioModule } from './modules/aspect-ratio/aspect-ratio.module';

// components
import { LoginComponent } from './modules/user/login.component';
import { MessageComponent } from './modules/message/message.component';

// services & interceptors
import { HttpCacheInterceptor } from './core/http/http-cache-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    MessageComponent
  ],
  imports: [
    // angular modules
    BrowserModule,
    BootstrapModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // feature modules
    InvoiceModule,
    InventoryModule,
    ImageModule,
    LineModule,
    LocationModule,
    MaterialModule,
    SizeModule,
    AspectRatioModule,
    UserModule,
    AppRoutingModule,
  ],
  exports: [ ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpCacheInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
