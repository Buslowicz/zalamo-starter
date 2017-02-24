/* tslint:disable:no-unused-variable */
/* 3rd party modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgReduxModule } from '@angular-redux/store';

/* C&C modules */
import { AppCommonModule } from '../common';
import { ProvidedApolloModule } from '../core/store';

/* Post module pieces */
import { PostActions } from './post.actions';
import { PostRoutingModule } from './post.router';

/* Views */
import { PostTestView } from './views/test.view';
import { PostDetailView } from './views/detail.view';

/**
 * TODO: Write a documentation
 */
@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    PostRoutingModule,
    NgReduxModule,
    ProvidedApolloModule
  ],
  declarations: [
    // Views & Components placeholder,
    PostTestView,
    PostDetailView
  ],
  providers: [
    PostActions
  ],
  exports: [
    PostRoutingModule
  ]
})
export class PostModule {}

export * from './post.actions';
export * from './post.reducer';
export * from './post.router';
