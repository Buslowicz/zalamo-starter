/* 3rd party modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgReduxModule } from '@angular-redux/store';

/* C&C modules */
import { AppCommonModule } from '../common';
import { ProvidedApolloModule } from '../core/store';

/* About module pieces */
import { AboutActions } from './about.actions';
import { AboutRoutingModule } from './about.router';

/* Views */
import { AboutPageView } from './views/page.view';

/**
 * TODO: Write a documentation
 */
@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    AboutRoutingModule,
    NgReduxModule,
    ProvidedApolloModule
  ],
  declarations: [
    // Views & Components placeholder,
    AboutPageView
  ],
  providers: [
    AboutActions
  ],
  exports: [
    AboutRoutingModule
  ]
})
export class AboutModule {}

export * from './about.actions';
export * from './about.reducer';
export * from './about.router';
