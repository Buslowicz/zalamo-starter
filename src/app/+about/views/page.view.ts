import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import 'rxjs/operator/takeWhile';

/* About module pieces */
import { AboutActions } from '../about.actions';
import { AboutStateItem } from '../about.reducer';

@Component({
  selector: 'about-page-view',
  template: `
    <h1>About</h1>
    <h2>{{items$ | async | json}}</h2>
    <h3>Current: {{currentItem$ | async}}</h3>
    <h3>Item: {{getCurrentItem() | async | json}}</h3>
  `
})
export class AboutPageView implements OnInit, OnDestroy {
  @select([ 'about', 'items' ]) public items$: Observable<Array<AboutStateItem>>;
  @select([ 'about', 'currentItem' ]) public currentItem$: Observable<number>;

  private _alive = true;

  constructor(private route: ActivatedRoute,
              public actions: AboutActions) {}

  public ngOnInit() {
    this.route.params
      .takeWhile(() => this._alive)
      .subscribe((params: Params) => this.actions.setCurrent(+params[ 'id' ]));
  }

  public ngOnDestroy() {
    this._alive = false;
  }

  public getCurrentItem(): Observable<AboutStateItem> {
    return Observable
      .combineLatest(this.items$, this.currentItem$)
      .map(([ list, current ]) => list.find((item) => item.id === current));
  }
}
