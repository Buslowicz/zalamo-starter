/* 3rd party modules */
import { Component, OnInit } from '@angular/core';

/* Post module pieces */
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../../../types/graphql';
import { select } from '@angular-redux/store';
import { PostActions } from '../post.actions';
import { AliveState } from '../../common';

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
