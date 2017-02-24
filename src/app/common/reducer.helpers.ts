/* 3rd party modules */
import { ApolloAction } from 'apollo-client/actions';

export function apolloOperationName(action: ApolloAction): string {
  return action['operationName'] || action['document'].definitions[ 0 ].name.value;
}
