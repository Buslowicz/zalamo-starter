import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';

const routes: Routes = [
  { path: '', redirectTo: '/counter', pathMatch: 'full' }
];

@NgModule({
  imports: [
    NgReduxRouterModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [ RouterModule ]
})
export class BaseRoutesModule {
  constructor(private ngReduxRouter: NgReduxRouter) {
    ngReduxRouter.initialize();
  }
}
