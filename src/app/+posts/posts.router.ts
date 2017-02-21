import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetPostQuery } from '../../types';
import { PostsViewComponent } from './views/posts.view';

import Post = GetPostQuery.Post;
import { PostDetailsViewComponent } from './views/post-details.view';

const routes: Routes = [
  { path: 'posts', component: PostsViewComponent, children: [
    { path: ':id', component: PostDetailsViewComponent, children: [] }
  ] }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PostsRoutingModule {}
