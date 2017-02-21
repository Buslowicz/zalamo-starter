import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../types';

/**
 * Action creators in Angular 2. We may as well adopt a more
 * class-based approach to satisfy Angular 2's OOP idiom. It
 * has the advantage of letting us use the dependency injector
 * as a replacement for redux-thunk.
 */
@Injectable()
export class CounterActions {
  public static INCREMENT_COUNTER = 'INCREMENT_COUNTER';
  public static DECREMENT_COUNTER = 'DECREMENT_COUNTER';
  public static RANDOMIZE_COUNTER = 'RANDOMIZE_COUNTER';

  constructor(private ngRedux: NgRedux<AppState>) {}

  public increment(): void {
    this.ngRedux.dispatch({ type: CounterActions.INCREMENT_COUNTER });
  }

  public decrement(): void {
    this.ngRedux.dispatch({ type: CounterActions.DECREMENT_COUNTER });
  }

  public incrementIfOdd(): void {
    const { counter } = this.ngRedux.getState();
    if (counter % 2 !== 0) {
      this.increment();
    }
  }

  public incrementAsync(delay = 1000): void {
    setTimeout(this.increment.bind(this), delay);
  }

  public randomize(): void {
    this.ngRedux.dispatch({
      type: CounterActions.RANDOMIZE_COUNTER,
      payload: Date.now() % 100
    });
  }
}
