import { Post, UpvotePostMutation, AllPostsQuery } from '../../types';
import { ApolloQueryResult } from 'apollo-client';
import { ApolloAction } from 'apollo-client/actions';
import * as _ from 'lodash';

import { apolloOperationName } from '../common';

const INITIAL_STATE: Array<Post> = [];

export function postsReducer(state = INITIAL_STATE, action: ApolloAction) {
  switch (action.type) {
    case 'APOLLO_QUERY_RESULT':
      if (apolloOperationName(action) === 'allPosts') {
        let result = action.result as ApolloQueryResult<AllPostsQuery.Result>;
        return result.data.posts;
      }
      break;
    case 'APOLLO_QUERY_RESULT_CLIENT':
      if (apolloOperationName(action) === 'allPosts') {
        let result = action.result as ApolloQueryResult<AllPostsQuery.Result>;
        return result.data.posts;
      }
      break;
    case 'APOLLO_MUTATION_INIT':
      if (apolloOperationName(action) === 'upvotePost') {
        state = _.cloneDeep(state);
        let id = (<UpvotePostMutation.Variables> action.variables).postId;
        let post = state.find((item) => item.id === id);
        post.votes++;
      }
      break;
    case 'APOLLO_MUTATION_RESULT':
      if (apolloOperationName(action) === 'upvotePost') {
        state = _.cloneDeep(state);
        let { id, votes } = (<ApolloQueryResult<UpvotePostMutation.Result>> action.result).data.upvotePost;
        let post = state.find((item) => item.id === id);
        post.votes = votes;
      }
      break;
    default:
      break;
  }
  return state;
}
