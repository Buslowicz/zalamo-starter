import { Injectable } from '@angular/core';
import { Apollo, } from 'apollo-angular';
import { NgRedux } from '@angular-redux/store';
import { ActivatedRoute, Params } from '@angular/router';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import {
  AllPostsQuery, UpvotePostMutation, GetPostQuery, ApolloQuery, ApolloMutation, Cast, AppState, Post
} from '../../types';

const allPosts = gql`
  query allPosts {
    posts {
      id
      title
      votes
      author {
        id
        firstName
        lastName
      }
    }
  }`;
const getPost = gql`
  query getPost($postId: Int!) {
    post(postId: $postId) {
      id
      title
      votes
      author {
        id
        firstName
        lastName
      }
    }
  }`;
const upvotePost = gql`
  mutation upvotePost($postId: Int!) {
    upvotePost(postId: $postId) {
      id
      votes
    }
  }`;

@Injectable()
export class PostsActions {
  constructor(private apollo: Apollo,
              private store: NgRedux<AppState>) {}

  public fetchPosts(): ApolloQuery<AllPostsQuery.Result> {
    return (this.apollo as Cast<AllPostsQuery.Variables>)
      .watchQuery({ query: allPosts });
  }

  public getPost(postId: number): ApolloQuery<GetPostQuery.Result> {
    return (this.apollo as Cast<GetPostQuery.Variables>)
      .watchQuery({ query: getPost, variables: { postId } });
  }

  public upVote(postId: number): ApolloMutation<UpvotePostMutation.Result> {
    return (this.apollo as Cast<UpvotePostMutation.Variables>)
      .mutate({ mutation: upvotePost, variables: { postId } });
  }

  public paramsFrom(route: ActivatedRoute): Observable<Params> {
    return route.params.scan((fixed: Params, params: Params) => Object.assign(fixed, params), {});
  }

  public byId(params: any): Observable<Post> {
    return this.store.select((state) => state.posts.find((post) => post.id === Number(params.id)));
  }
}
