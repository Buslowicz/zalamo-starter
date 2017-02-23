import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { HomeView } from '../home/home.view';
import { NoContentView } from '../no-content/no-content.view';
import { NamedRoutes } from '../common/named-router';

const routes = NamedRoutes.provideRoutes([
  [ 'index', { path: '', component: HomeView } ],
  [ 'homeView', { path: 'home', component: HomeView } ],
  [ '404', { path: '**', component: NoContentView } ]
]);

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
