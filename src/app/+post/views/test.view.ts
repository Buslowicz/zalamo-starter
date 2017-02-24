/* 3rd party modules */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import 'rxjs/operator/takeWhile';

/* C&C */
import { NamedRoutes } from '../../common/named-router';

/* Post module pieces */
import { PostActions } from '../post.actions';

/* Types */
import { Post } from '../../../types/graphql';

@Component({
  selector: 'post-test-view',
  template: `
    <ul>
      <li *ngFor="let post of posts$ | async">
        <b>{{post.title}}</b> <i>by</i> <u>{{post.author.firstName}} {{post.author.lastName}}</u>
        <button (click)="actions.upVote(post.id)">{{post.votes}}</button>
        <a [routerLink]="['/posts', post.id]">[Show]</a>
      </li>
    </ul>
    <p>Current {{getCurrent() | async | json}}</p>
  `
})
export class PostTestView implements OnInit, OnDestroy {
  @select([ 'post', 'posts' ]) public posts$: Observable<Array<Post>>;

  private _alive = true;

  constructor(private route: ActivatedRoute,
              public actions: PostActions) {}

  public ngOnInit(): void {
    this.actions
      .getAll()
      .takeWhile(() => this._alive)
      .subscribe();
  }

  public getCurrent() {
    return Observable
      .combineLatest(this.route.params, this.posts$)
      .map(([params, posts]) => posts.find(({id}) => id === Number(params['id'])));
  }

  public ngOnDestroy(): void {
    this._alive = false;
  }
}
