/* 3rd party modules */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

/* C&C Modules */
import { changeDetection, encapsulation } from '../../common/config';
import { AliveState } from '../../common';

/* Post module pieces */
import { PostActions } from '../post.actions';

/* Types */
import { Post, AppState } from '../../../types';

/**
 * TODO: Write a documentation
 */
@Component({
  changeDetection, encapsulation,
  selector: 'post-detail-view',
  template: `
    <p>Current {{currentPost$ | async | json}}</p>
  `
})
export class PostDetailView extends AliveState implements OnInit {
  private static getCurrent({ post: { posts, currentItemId } }: AppState) {
    return posts.find(({ id }) => id === currentItemId);
  }

  @select([ 'post', 'posts' ]) public posts$: Observable<Array<Post>>;
  @select(PostDetailView.getCurrent) public currentPost$: Observable<Post>;

  constructor(public actions: PostActions,
              public route: ActivatedRoute) {
    super();
  }

  /**
   * Initialize the subscription
   */
  public ngOnInit(): void {
    this.subscribeWhileAlive(
      this.route.params.do((params) => this.actions.setCurrentItem(Number(params[ 'id' ])))
    );
  }
}
