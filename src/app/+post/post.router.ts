/* 3rd party modules */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Views */
import { PostTestView } from './views/test.view';

const routes: Routes = [
  // Define routes here,
  { path: 'posts', component: PostTestView, children: [] },
  { path: 'posts/:id', component: PostTestView, children: [] }
];

/**
 * Routes for Post module
 */
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PostRoutingModule {}
