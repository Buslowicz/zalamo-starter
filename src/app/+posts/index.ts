/* 3rd party modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgReduxModule } from '@angular-redux/store';

/* C&C modules */
import { AppCommonModule } from '../common';
import { ProvidedApolloModule } from '../core/store';

/* Posts module pieces */
import { PostsActions } from './posts.actions';
import { PostsRoutingModule } from './posts.router';

/* Views */
import { PostsViewComponent } from './views/posts.view';
import { PostDetailsViewComponent } from './views/post-details.view';

/* Components */
import { PostsComponent } from './components/posts.component';
import { PostDetailsComponent } from './components/post-details.component';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    PostsRoutingModule,
    NgReduxModule,
    ProvidedApolloModule
  ],
  declarations: [
    PostsComponent,
    PostDetailsComponent,
    PostsViewComponent,
    PostDetailsViewComponent
  ],
  providers: [
    PostsActions
  ],
  exports: [
    PostsRoutingModule
  ]
})
export class PostsModule {}

export * from './posts.actions';
export * from './posts.reducer';
export * from './posts.router';
