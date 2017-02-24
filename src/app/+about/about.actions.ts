/* 3rd party modules */
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { NgRedux } from '@angular-redux/store';
import { INITIAL_STATE } from './about.reducer';
import { AppState } from '../../types';

/**
 * Redux Actions for About module
 */
@Injectable()
export class AboutActions {
  constructor(private apollo: Apollo,
              private store: NgRedux<AppState>) {}

  public setCurrent(id: number) {
    if (typeof id !== 'number' || Number.isNaN(id)) {
      id = INITIAL_STATE.currentItem;
    }
    this.store.dispatch({ type: 'ABOUT_SET_CURRENT', payload: id });
  }
}
