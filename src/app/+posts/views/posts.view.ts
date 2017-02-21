import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../../../types';
import { PostsActions } from '../posts.actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-posts-view',
  template: `
    <app-posts [posts]="posts$ | async"></app-posts>
    <router-outlet></router-outlet>
`
})
export class PostsViewComponent implements OnInit, OnDestroy {
  @select() public posts$: Observable<Array<Post>>;

  private _sub: Subscription;

  constructor(public actions: PostsActions) {}

  public ngOnInit(): void {
    this._sub = this.actions.fetchPosts().subscribe();
  }

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
