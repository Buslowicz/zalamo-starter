/* 3rd party modules */
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Apollo } from 'apollo-angular';

/* Post module pieces */
import { INITIAL_STATE, PostState } from './post.reducer';

/* Types */
import {
  Cast, ApolloQuery, ApolloMutation,
  AllPostsQuery, GetPostQuery, UpvotePostMutation
} from '../../types';

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
  public getAll(): ApolloQuery<AllPostsQuery.Result> {
    return (this.apollo as Cast<AllPostsQuery.Variables>).watchQuery({ query: allPosts });
  }

  /**
   * Get a single post by Id
   * @returns Query result Observable
   */
  public byId(postId: number): ApolloQuery<GetPostQuery.Result> {
    return (this.apollo as Cast<GetPostQuery.Variables>).watchQuery({ query: getPost, variables: { postId } });
  }

  /**
   * Increment votes for a post by 1 and return the diff
   * @returns Mutation result Observable
   */
  public upVote(postId: number): ApolloMutation<UpvotePostMutation.Result> {
    return (this.apollo as Cast<UpvotePostMutation.Variables>).mutate({ mutation: upvotePost, variables: { postId } });
  }

  /**
   * Set the current item ID
   * @param id Identifier
   */
  public setCurrentItem(id: number): void {
    if (!Number.isInteger(id)) {
      id = INITIAL_STATE.currentItemId;
    }
    this.store.dispatch({ type: 'POST_SET_CURRENT', payload: id });
  }
}
