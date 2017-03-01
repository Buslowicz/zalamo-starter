/* 3rd party modules */
import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

/* C&C Modules */
import { AliveState } from '../../common';

/* Post module pieces */
import { PostActions } from '../post.actions';

/* Types */
import { Post } from '../../../types/graphql';

/**
 * TODO: Write a documentation
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'post-test-view',
  template: `
    <ul>
      <li *ngFor="let post of posts$ | async">
        <b>{{post.title}}</b> <i>by</i> <u>{{post.author.firstName}} {{post.author.lastName}}</u>
        <button (click)="actions.upVote(post.id)">{{post.votes}}</button>
        <a [routerLink]="['/posts', post.id]">[Show]</a>
      </li>
    </ul>
    <router-outlet></router-outlet>
  `
})
export class PostTestView extends AliveState implements OnInit {
  @select([ 'post', 'posts' ]) public posts$: Observable<Array<Post>>;

  constructor(public actions: PostActions) {
    super();
  }

  /**
   * Initialize the subscription
   */
  public ngOnInit(): void {
    this.subscribeWhileAlive(this.actions.getAll());
  }
}
