/* 3rd party modules */
import { ApolloAction } from 'apollo-client/actions';
import { cloneDeep } from 'lodash';

/* C&C Modules */
import { apolloOperationName } from '../common';

/* Types */
import { UpvotePostMutation, Post } from '../../types';

/**
 * Post state
 */
export interface PostState {
  /**
   * Available posts
   */
  posts: Array<Post>;

  /**
   * Current post ID
   */
  currentItemId: number;
}

/**
 * Initial state of the Post module
 */
export const INITIAL_STATE: PostState = {
  posts: [],
  currentItemId: 0
};

// Note: Remember to use `apolloOperationName` to check the query name

/**
 * Reducer actions enum (for Intellij IDEs hinting)
 */
export enum PostReducerActions {
  SET_CURRENT = <any> 'POST_SET_CURRENT'
}

/**
 * Reducer for Post module
 */
export function postReducer(state = INITIAL_STATE, action: ApolloAction | any) {
  switch (action.type) {
    case PostReducerActions.SET_CURRENT:
      state = cloneDeep(state);
      state.currentItemId = action.payload;
      break;
    case 'APOLLO_QUERY_RESULT':
    case 'APOLLO_QUERY_RESULT_CLIENT':
      if (apolloOperationName(action) === 'allPosts') {
        state = Object.assign(cloneDeep(state), action.result.data);
      }
      break;
    case 'APOLLO_MUTATION_INIT':
      if (apolloOperationName(action) === 'upvotePost') {
        state = cloneDeep(state);
        state.posts.find(({ id }) => id === (<UpvotePostMutation.Variables> action.variables).postId).votes++;
      }
      break;
    case 'APOLLO_MUTATION_RESULT':
      if (apolloOperationName(action) === 'upvotePost') {
        state = cloneDeep(state);
        let update = (<UpvotePostMutation.Result> action.result.data).upvotePost;
        Object.assign(state.posts.find(({ id }) => id === update.id), update);
      }
      break;
    default:
      break;
  }
  return state;
}
