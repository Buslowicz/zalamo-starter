/* 3rd party modules */
import { ApolloAction } from 'apollo-client/actions';
import { cloneDeep } from 'lodash';

/* C&C Modules */
import { apolloOperationName } from '../common';
import { ApolloEvent } from '../core/store';

/* Types */
import { UpvotePostMutation, Post } from '../../types/graphql';

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
    case ApolloEvent.QUERY_RESULT:
    case ApolloEvent.QUERY_RESULT_CLIENT:
      if (apolloOperationName(action) === 'allPosts') {
        state = Object.assign(cloneDeep(state), action.result.data);
      }
      break;
    case ApolloEvent.MUTATION_INIT:
      if (apolloOperationName(action) === 'upvotePost') {
        state = cloneDeep(state);
        const { postId } = action.variables as UpvotePostMutation.Variables;
        state.posts.find(({ id }) => id === postId).votes++;
      }
      break;
    case ApolloEvent.MUTATION_RESULT:
      if (apolloOperationName(action) === 'upvotePost') {
        state = cloneDeep(state);
        const { upvotePost: diff } = action.result.data as UpvotePostMutation.Result;
        Object.assign(state.posts.find(({ id }) => id === diff.id), diff);
      }
      break;
    default:
      break;
  }
  return state;
}
