import { Component, Input } from '@angular/core';
import { CounterActions } from '../counter.actions';

@Component({
  selector: 'app-counter',
  template: `
    <h1>Counter Demo</h1>
    <p>
      <button (click)="actions.increment()">+</button>
      <button (click)="actions.decrement()">-</button>
      <button (click)="actions.incrementIfOdd()">Increment if odd</button>
      <button (click)="actions.incrementAsync(2222)">Increment async</button>
      <button (click)="actions.randomize()">Set to random number</button>

      Clicked: {{ counter }} times<br>
    </p>
`
})
export class CounterComponent {
  @Input() public counter: number;

  constructor(public actions: CounterActions) {}
}
