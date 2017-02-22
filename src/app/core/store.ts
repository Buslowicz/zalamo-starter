import { ModuleWithProviders, NgModule } from '@angular/core';
import { routerReducer } from '@angular-redux/router';
import { NgRedux, DevToolsExtension, NgReduxModule } from '@angular-redux/store';
import { combineReducers, Reducer, Action, applyMiddleware } from 'redux';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';

import { AppState } from '../../types';

export const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:8080/graphql'
  }),
  dataIdFromObject: (r: any) => r.id,
  queryDeduplication: true,
  connectToDevTools: true
});
export function provideClient(): ApolloClient {
  return client;
}

export const ProvidedApolloModule = ApolloModule.forRoot(provideClient);

@NgModule({
  imports: [NgReduxModule],
  exports: [NgReduxModule]
})
export class StoreModule {
  constructor(private ngRedux: NgRedux<AppState>,
              private devTool: DevToolsExtension) {
    ngRedux.configureStore(
      combineReducers<AppState>({
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
