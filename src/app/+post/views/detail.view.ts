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

/**
 * TODO: Write a documentation
 */
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

  /**
   * Initialize the subscription
   */
  public ngOnInit(): void {
    this.subscribeWhileAlive(this.actions.getAll());
  }

  /**
   * Get current item based on items$ and currentItem$ properties
   * @returns Single item Observable
   */
  public getCurrent(): Observable<any> {
    return Observable
      .combineLatest(this.route.params, this.posts$)
      .map(([params, posts]) => posts.find(({id}) => id === Number(params['id'])));
  }
}
