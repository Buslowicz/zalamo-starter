/* 3rd party modules */
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

/* Post module pieces */
import { INITIAL_STATE } from './about.reducer';

/* Types */
import {
  AppState, ApolloQuery, Cast, AllPostsQuery, GetPostQuery, UpvotePostMutation, ApolloMutation
} from '../../types';

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

  public byId(id: number): ApolloQuery<GetPostQuery.Result> {
    return (this.apollo as Cast<GetPostQuery.Variables>).watchQuery({ query: getPost });
  }

  public upVote(postId: number): ApolloMutation<UpvotePostMutation.Result> {
    return (this.apollo as Cast<UpvotePostMutation.Variables>).mutate({ mutation: upvotePost, variables: { postId } });
  }

  //  public setCurrentItem(id: number) {
  //    if (!Number.isInteger(id)) {
  //      id = INITIAL_STATE.currentItemId;
  //    }
  //    this.store.dispatch({ type: 'ABOUT_SET_CURRENT', payload: id });
  //  }
}
