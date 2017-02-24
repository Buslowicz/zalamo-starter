/* 3rd party modules */
import { NgModule } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Apollo } from 'apollo-angular';
import { Subject } from 'rxjs';

import { RouterLinkStubDirective } from './stubs/router-link';
import { RouterOutletStubComponent } from './stubs/router-outlet';

export const mockNgRedux = <T>(state = {}): { mediator: Subject<any>, state: any, ngRedux: NgRedux<T> } => {
  let mediator = new Subject();
  return {
    mediator,
    state,
    ngRedux: <any> {
      dispatch: (action) => mediator.next(action),
      configureStore: () => {/* */},
      select: (selector?, comparator?) => mediator.map(selector.call ? selector : ((item) => item[ selector ])),
      getState: () => state
    }
  };
};

export const mockActivatedRoute = () => ({
  params: new Subject()
});

export const mockApollo = (): Apollo => (<any> {
  watchQuery: (opts) => opts,
  query: (opts) => opts,
  mutate: (opts) => opts
});

@NgModule({
  imports: [],
  exports: [ RouterLinkStubDirective, RouterOutletStubComponent ],
  declarations: [ RouterLinkStubDirective, RouterOutletStubComponent ],
  providers: [],
})
export class Module {}

export * from './stubs/router-link';
export * from './stubs/router-outlet';
