import { Component } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-counter-view',
  template: `<app-counter [counter]="counter$ | async"></app-counter>`
})
export class CounterViewComponent {
  @select() public counter$: Observable<number>;
}
