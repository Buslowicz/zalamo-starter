import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgReduxModule } from '@angular-redux/store';
import { AppCommonModule } from '../common';

import { CounterActions } from './counter.actions';
import { CounterRoutingModule } from './counter.router';
import { CounterViewComponent } from './views/counter.view';
import { CounterComponent } from './components/counter.component';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    CounterRoutingModule,
    NgReduxModule
  ],
  declarations: [
    CounterComponent,
    CounterViewComponent
  ],
  providers: [
    CounterActions
  ],
  exports: [
    CounterRoutingModule
  ]
})
export class CounterModule {}

export * from './counter.actions';
export * from './counter.reducer';
export * from './counter.router';
