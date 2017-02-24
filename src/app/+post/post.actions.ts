/* tslint:disable:no-unused-variable */
/* 3rd party modules */
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Apollo } from 'apollo-angular';

/* Post module pieces */
import { INITIAL_STATE } from './post.reducer';

/* Types */
import {
  AppState, Cast, ApolloQuery, ApolloMutation,
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
              private store: NgRedux<AppState>) {}

  public getAll(): ApolloQuery<AllPostsQuery.Result> {
    return (this.apollo as Cast<AllPostsQuery.Variables>).watchQuery({ query: allPosts });
  }

  public byId(postId: number): ApolloQuery<GetPostQuery.Result> {
    return (this.apollo as Cast<GetPostQuery.Variables>).watchQuery({ query: getPost, variables: { postId } });
  }

  public upVote(postId: number): ApolloMutation<UpvotePostMutation.Result> {
    return (this.apollo as Cast<UpvotePostMutation.Variables>).mutate({ mutation: upvotePost, variables: { postId } });
  }

  public setCurrentItem(id: number) {
    if (!Number.isInteger(id)) {
      id = INITIAL_STATE.currentItemId;
    }
    this.store.dispatch({ type: 'POST_SET_CURRENT', payload: id });
  }
}
