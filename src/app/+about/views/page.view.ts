/* 3rd party modules */
import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import 'rxjs/operator/takeWhile';

/* C&C Modules */
import { changeDetection, encapsulation } from '../../common/config';
import { AliveState } from '../../common';

/* About module pieces */
import { AboutActions } from '../about.actions';
import { AboutStateItem } from '../about.reducer';

/**
 * TODO: Write a documentation
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'about-page-view',
  template: `
    <h1>About</h1>
    <h2>{{items$ | async | json}}</h2>
    <h3>Current: {{currentItem$ | async}}</h3>
  `
})
export class AboutPageView extends AliveState implements OnInit {
  @select([ 'about', 'items' ]) public items$: Observable<Array<AboutStateItem>>;
  @select([ 'about', 'currentItem' ]) public currentItem$: Observable<number>;

  constructor(private route: ActivatedRoute,
              public actions: AboutActions) {
    super();
  }

  /**
   * Initialize the subscription
   */
  public ngOnInit(): void {
    this.subscribeWhileAlive(
      this.route.params.do((params: Params) => this.actions.setCurrent(+params[ 'id' ]))
    );
  }
}
