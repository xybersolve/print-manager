import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './modules/user/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { LoginComponent } from './modules/user/login.component';

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
    path: 'login',
    component: LoginComponent
  }, {
    path: 'not-found',
    component: PageNotFoundComponent
  }, {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [ 
    RouterModule.forRoot(routes, { enableTracing: false })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
