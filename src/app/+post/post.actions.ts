/* 3rd party modules */
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

/* Post module pieces */
import { INITIAL_STATE, PostState, PostReducerActions } from './post.reducer';

/* Types */
import { GetPostQuery, UpvotePostMutation } from '../../types/graphql';

/* Queries */
import allPosts from './queries/allPosts.graphql';
import getPost from './queries/getPost.graphql';
import upvotePost from './queries/upvotePost.graphql';

/**
 * Redux Actions for Post module
 */
@Injectable()
export class PostActions {
  constructor(private apollo: Apollo,
              private store: NgRedux<{ post: PostState }>) {}

  /**
   * Get all posts
   * @returns Query result Observable
   */
  public getAll(): Observable<any> {
    return this.apollo.watchQuery({ query: allPosts });
  }

  /**
   * Get a single post by Id
   * @returns Query result Observable
   */
  public byId(postId: number): Observable<any> {
    const variables: GetPostQuery.Variables = { postId };
    return this.apollo.watchQuery({ query: getPost, variables });
  }

  /**
   * Increment votes for a post by 1 and return the diff
   * @returns Mutation result Observable
   */
  public upVote(postId: number): Observable<any> {
    const variables: UpvotePostMutation.Variables = { postId };
    return this.apollo.mutate({ mutation: upvotePost, variables });
  }

  /**
   * Set the current item ID
   * @param id Identifier
   */
  public setCurrentItem(id: number): void {
    if (!Number.isInteger(id)) {
      id = INITIAL_STATE.currentItemId;
    }
    this.store.dispatch({ type: PostReducerActions.SET_CURRENT, payload: id });
  }
}
