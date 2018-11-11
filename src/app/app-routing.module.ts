import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { InventoryComponent } from './inventory/inventory.component';
import { ImageComponent } from './image/image.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './user/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { InventoryModule } from './inventory/inventory.module';

const routes: Routes = [
  {
    path: 'home',
    component: WelcomeComponent
  }, { // refactor: change 'welcome' to 'home'
    path: 'welcome',
    redirectTo: 'home',
    pathMatch: 'full'
  }, {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }, {
    path: 'not-found',
    component: PageNotFoundComponent
  }, {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [ // fires up router service here (only)
    RouterModule.forRoot(routes),
    InventoryModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
