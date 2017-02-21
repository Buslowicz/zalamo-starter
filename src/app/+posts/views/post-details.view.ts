import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';
import { Post, AppState } from '../../../types';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsActions } from '../posts.actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-post-details-view',
  template: `
    <app-post-details [post]="post$ | async | fallback"></app-post-details>
`
})
export class PostDetailsViewComponent implements OnInit, OnDestroy {
  public post$: Observable<Post>;

  private _sub: Subscription;

  constructor(private route: ActivatedRoute,
              private actions: PostsActions) {}

  public ngOnInit(): void {
    this._sub = this.actions
      .paramsFrom(this.route)
      .subscribe((params) => this.post$ = this.actions.byId(params));
  }

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
