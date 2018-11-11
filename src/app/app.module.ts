import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { ImageComponent } from './image/image/image.component';
// import { InventoryComponent } from './inventory/inventory.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
// import { LoginComponent } from './user/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// feature modules
import { InventoryModule } from './inventory/inventory.module';
import { ImageModule } from './image/image.module';
import { UserModule } from './user/user.module';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    // ImageComponent,
    // InventoryComponent,
    NavHeaderComponent,
    // LoginComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    InventoryModule,
    ImageModule,
    UserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
