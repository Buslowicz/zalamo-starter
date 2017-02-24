/* 3rd party modules */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import 'rxjs/operator/takeWhile';

/* C&C */
import { AliveState } from '../../common';

/* About module pieces */
import { AboutActions } from '../about.actions';
import { AboutStateItem } from '../about.reducer';

/**
 * TODO: Write a documentation
 */
@Component({
  selector: 'about-page-view',
  template: `
    <h1>About</h1>
    <h2>{{items$ | async | json}}</h2>
    <h3>Current: {{currentItem$ | async}}</h3>
    <h3>Item: {{getCurrentItem() | async | json}}</h3>
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
    this.subscribeWhileAlive(this.route.params.do((params: Params) => this.actions.setCurrent(+params[ 'id' ])));
  }

  /**
   * Get current item based on items$ and currentItem$ properties
   * @returns Single item Observable
   */
  public getCurrentItem(): Observable<AboutStateItem> {
    return Observable
      .combineLatest(this.items$, this.currentItem$)
      .map(([ list, current ]) => list.find((item) => item.id === current));
  }
}
