import { NgRedux } from '@angular-redux/store';
import { Apollo } from 'apollo-angular';
import { Subject } from 'rxjs';

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

export * from './stubs/router-link';
export * from './stubs/router-outlet';
