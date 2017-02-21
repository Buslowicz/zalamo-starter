/* tslint:disable:no-unused-variable */
import { CounterActions } from './counter.actions';
import { AppState } from '../../types';
import { counterReducer } from './counter.reducer';
import { mockNgRedux } from '../common/mocks';

export const mockCounterActions = () => ({
  increment() {/* */},
  decrement() {/* */},
  incrementIfOdd() {/* */},
  incrementAsync(arg) {/* */},
  randomize() {/* */}
});

describe('Counter', () => {
  describe('Actions', () => {
    const { mediator, state, ngRedux } = mockNgRedux<AppState>();

    let service: CounterActions;

    beforeEach(() => {
      service = new CounterActions(ngRedux);
    });

    it('should dispatch an `increment` event', (done) => {
      mediator.first().subscribe(({ type }) => {
        expect(type).toEqual(CounterActions.INCREMENT_COUNTER);
        done();
      });
      service.increment();
    });

    it('should dispatch a `decrement` event', (done) => {
      mediator.first().subscribe(({ type }) => {
        expect(type).toEqual(CounterActions.DECREMENT_COUNTER);
        done();
      });
      service.decrement();
    });

    it('should dispatch a `randomize` event', (done) => {
      mediator.first().subscribe(({ type, payload }) => {
        expect(type).toEqual(CounterActions.RANDOMIZE_COUNTER);
        expect(typeof payload).toEqual('number');
        expect(payload).toBeLessThan(100);
        done();
      });
      service.randomize();
    });

    it('should dispatch an `increment` event if counter is odd', (done) => {
      mediator.first().subscribe(({ type }) => {
        expect(type).toEqual(CounterActions.INCREMENT_COUNTER);
        done();
      });
      Object.assign(state, { counter: 3 });
      service.incrementIfOdd();
    });

    it('should NOT dispatch an `increment` event if counter is even', (done) => {
      let sub = mediator.first().subscribe(() => {
        expect(true).toBeFalsy('`incrementIfOdd` should not dispatch events if counter is even');
      });
      Object.assign(state, { counter: 2 });
      service.incrementIfOdd();
      setTimeout(() => {
        sub.unsubscribe();
        done();
      }, 0);
    });

    it('should dispatch an `increment` event asynchronously', (done) => {
      let start;
      mediator.first().subscribe(({ type }) => {
        expect(type).toEqual(CounterActions.INCREMENT_COUNTER);
        expect(Date.now() - start).toBeGreaterThan(10);
        done();
      });
      Object.assign(state, { counter: 2 });
      start = Date.now();
      service.incrementAsync(15);
    });
  });
  describe('Reducer', () => {
    it('should return proper state', () => {
      expect(counterReducer(1, { type: CounterActions.INCREMENT_COUNTER })).toEqual(2);
      expect(counterReducer(-1, { type: CounterActions.INCREMENT_COUNTER })).toEqual(0);

      expect(counterReducer(5, { type: CounterActions.DECREMENT_COUNTER })).toEqual(4);
      expect(counterReducer(-10, { type: CounterActions.DECREMENT_COUNTER })).toEqual(-11);

      expect(counterReducer(0, { type: CounterActions.RANDOMIZE_COUNTER, payload: 10 })).toEqual(10);
      expect(counterReducer(0, { type: CounterActions.RANDOMIZE_COUNTER, payload: 0 })).toEqual(0);
      expect(counterReducer(0, { type: CounterActions.RANDOMIZE_COUNTER, payload: -9 })).toEqual(-9);

      expect(counterReducer(0, { type: 'other' })).toEqual(0);
      expect(counterReducer(10, { type: 'other' })).toEqual(10);
      expect(counterReducer(-20, { type: 'other' })).toEqual(-20);
    });
  });
});
