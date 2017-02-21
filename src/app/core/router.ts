import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules, Routes } from '@angular/router';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { HomeComponent } from '../home';
import { NoContentComponent } from '../no-content';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'detail', loadChildren: '../+detail#DetailModule' },
  { path: 'barrel', loadChildren: '../+barrel#BarrelModule' },
  { path: '**', component: NoContentComponent },
];

@NgModule({
  imports: [
    NgReduxRouterModule,
    RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  exports: [ RouterModule ]
})
export class BaseRoutesModule {
  constructor(private ngReduxRouter: NgReduxRouter) {
    ngReduxRouter.initialize();
  }
}
