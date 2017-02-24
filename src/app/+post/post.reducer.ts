/* 3rd party modules */
import { ApolloAction } from 'apollo-client/actions';

/* C&C */
import { apolloOperationName } from '../common';
import { UpvotePostMutation } from '../../types/graphql';
import { cloneDeep } from 'apollo-client/util/cloneDeep';

/* Types */
// import {  } from '../../../types';

// TODO: update INITIAL_STATE type
export const INITIAL_STATE = {
  posts: [],
  currentItemId: 0
};

// Note: Remember to use `apolloOperationName` to check the query name

/**
 * Reducer actions enum (for Intellij IDEs hinting)
 */
declare enum PostReducerActions {
  ABOUT_SET_CURRENT
}

/**
 * Reducer for Post module
 */
export function postReducer(state = INITIAL_STATE, action: ApolloAction) {
  switch (action.type) {
    //      case 'ABOUT_SET_CURRENT':
    //        state = cloneDeep(state);
    //        state.currentItem = action.payload;
    //        break;
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
        Object.assign(state.posts.find(({id}) => id === update.id), update);
      }
      break;
    default:
      break;
  }
  return state;
}
