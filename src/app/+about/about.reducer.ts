/* 3rd party modules */
import { cloneDeep } from 'lodash';

/* C&C */
import { apolloOperationName } from '../common';

/**
 * About Item state
 */
export interface AboutStateItem {
  /**
   * Item ID
   */
  id: number;

  /**
   * Item name
   */
  name: string;

  /**
   * Item Value
   */
  value: any;
}

/**
 * About state
 */
export interface AboutState {
  /**
   * Available items
   */
  items: Array<AboutStateItem>;

  /**
   * Current item ID
   */
  currentItem: number;
}

/**
 * Initial state of the About module
 */
export const INITIAL_STATE: AboutState = {
  items: [
    { id: 0, name: 'a', value: 1 },
    { id: 1, name: 'b', value: 2 },
    { id: 2, name: 'c', value: 3 }
  ],
  currentItem: 0
};

/**
 * Reducer actions enum (for Intellij IDEs hinting)
 */
declare enum AboutReducerActions {
  ABOUT_SET_CURRENT
}

// Note: Remember to use `apolloOperationName` to check the query name

/**
 * Reducer for About module
 */
export function aboutReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ABOUT_SET_CURRENT':
      state = cloneDeep(state);
      state.currentItem = action.payload;
      break;
    case 'APOLLO_QUERY_RESULT':
      if (apolloOperationName(action) === 'modifyItem') {
        let updatedItem = action.result.data.addItem;
        Object.assign(cloneDeep(state.items).find((n) => n.id === updatedItem.id) || {}, updatedItem);
      }
      break;
    default:
      break;
  }
  return state;
}
