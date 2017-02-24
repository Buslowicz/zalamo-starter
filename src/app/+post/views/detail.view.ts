/* tslint:disable:no-unused-variable */
/* 3rd party modules */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

/* C&C */
import { AliveState } from '../../common';

/* Post module pieces */
import { PostActions } from '../post.actions';

/* Types */
import { Post } from '../../../types';

@Component({
  selector: 'post-detail-view',
  template: `
    <p>Current {{getCurrent() | async | json}}</p>
  `
})
export class PostDetailView extends AliveState implements OnInit {
  @select([ 'post', 'posts' ]) public posts$: Observable<Array<Post>>;

  constructor(public actions: PostActions,
              public route: ActivatedRoute) {
    super();
  }

  public ngOnInit(): void {
    this.subscribeWhileAlive(this.actions.getAll());
  }

  public getCurrent() {
    return Observable
      .combineLatest(this.route.params, this.posts$)
      .map(([params, posts]) => posts.find(({id}) => id === Number(params['id'])));
  }
}
