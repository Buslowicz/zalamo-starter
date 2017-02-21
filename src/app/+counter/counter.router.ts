import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterViewComponent } from './views/counter.view';

const routes: Routes = [
  { path: 'counter', component: CounterViewComponent, children: [] }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CounterRoutingModule {}
