import { PostsActions } from './posts.actions';
import { postsReducer } from './posts.reducer';
import { mockApollo, mockNgRedux } from '../common/mocks';
import { Subject } from 'rxjs';
import { AppState } from '../../types/index';

export const mockPostsActions = () => {
  const s = new Subject();
  return <any> {
    fetchPosts: () => s,
    getPost: () => s,
    upVote: () => s,

    paramsFrom: PostsActions.prototype.paramsFrom,
    byId: PostsActions.prototype.byId
  };
};

describe('Posts', () => {
  describe('Actions', () => {
    const { mediator, state, ngRedux } = mockNgRedux<AppState>();
    const apollo = mockApollo();

    let service: PostsActions;

    beforeEach(() => {
      service = new PostsActions(apollo, ngRedux);
    });

    it('should call an allPosts query', () => {
      expect((<any> service.fetchPosts()).query.definitions[ 0 ].name.value).toEqual('allPosts');
    });

    it('should call a getPost query', () => {
      let getPostResult = <any> service.getPost(5);
      expect(getPostResult.query.definitions[ 0 ].name.value).toEqual('getPost');
      expect(getPostResult.variables).toEqual({ postId: 5 });
    });

    it('should call an upvotePost query', () => {
      let getPostResult = <any> service.upVote(8);
      expect(getPostResult.mutation.definitions[ 0 ].name.value).toEqual('upvotePost');
      expect(getPostResult.variables).toEqual({ postId: 8 });
    });
  });
  describe('Reducer', () => {
    const createAction = (type, name, data?, variables?): any => ({
      type, variables, result: { data },
      operationName: name,
      document: { definitions: [ { name: { value: name } } ] }
    });

    it('should return all posts when receiving APOLLO_QUERY_RESULT', () => {
      let state = postsReducer([], createAction(
        'APOLLO_QUERY_RESULT',
        'allPosts',
        { posts: [ 1, 2, 3 ] }
      ));
      expect(state).toEqual([ 1, 2, 3 ]);
    });

    it('should return all posts when receiving APOLLO_QUERY_RESULT_CLIENT', () => {
      let state = postsReducer([], createAction(
        'APOLLO_QUERY_RESULT_CLIENT',
        'allPosts',
        { posts: [ 3, 2, 1 ] }
      ));
      expect(state).toEqual([ 3, 2, 1 ]);
    });

    it('should increment votes by 1 for given postId when receiving APOLLO_MUTATION_INIT', () => {
      let state = postsReducer(<any> [ { id: 1, votes: 1 } ], createAction(
        'APOLLO_MUTATION_INIT',
        'upvotePost',
        null,
        { postId: 1 }
      ));
      expect(state).toEqual([ { id: 1, votes: 2 } ]);
    });

    it('should set votes to result when receiving APOLLO_MUTATION_RESULT', () => {
      let state = postsReducer(<any> [ { id: 1, votes: 1 } ], createAction(
        'APOLLO_MUTATION_RESULT',
        'upvotePost',
        { upvotePost: { id: 1, votes: 10 } }
      ));
      expect(state).toEqual([ { id: 1, votes: 10 } ]);
    });
  });
});
