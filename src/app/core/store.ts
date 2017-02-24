import { ModuleWithProviders, NgModule } from '@angular/core';

import { routerReducer } from '@angular-redux/router';
import { NgRedux, DevToolsExtension, NgReduxModule } from '@angular-redux/store';
import { combineReducers, Reducer, Action, applyMiddleware } from 'redux';

import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';
import { PersistedQueryNetworkInterface } from 'persistgraphql';

/* Types and Queries */
import { AppState } from '../../types';
import queryMap from '../../persistent-queries.json';

/* Reducers */
import { aboutReducer } from '../+about/about.reducer';
import { postReducer } from '../+post/post.reducer';

const networkInterface = new PersistedQueryNetworkInterface({
  queryMap,
  uri: 'http://localhost:8080/graphql'
});

export const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: (r: any) => r.id,
  queryDeduplication: true,
  connectToDevTools: true
});
export function provideClient(): ApolloClient {
  return client;
}

export const ProvidedApolloModule = ApolloModule.forRoot(provideClient);

@NgModule({
  imports: [ NgReduxModule ],
  exports: [ NgReduxModule ]
})
export class StoreModule {
  constructor(private ngRedux: NgRedux<AppState>,
              private devTool: DevToolsExtension) {
    ngRedux.configureStore(
      combineReducers<AppState>({
        about: aboutReducer,
        post: postReducer,
        router: routerReducer,
        apollo: client.reducer() as Reducer<Action>
      }),
      {},
      [],
      [
        applyMiddleware(client.middleware()),
        devTool.isEnabled() ? devTool.enhancer() : (f) => f
      ]
    );
  }
}
