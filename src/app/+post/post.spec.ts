/* tslint:disable:no-unused-variable */
/* C&C Modules */
import { mockApollo, mockNgRedux } from '../common/mocks';

/* Post module pieces */
import { PostActions } from './post.actions';

/* Types */
import { PostState } from './post.reducer';

/**
 * Function to generate PostActions mocking object
 */
export const mockPostActions = () => {
  // const s = new Subject();
  return <any> {
    // fetchPost: () => s,
  };
};

const { ngRedux, mediator } = mockNgRedux<{ post: PostState }>({ posts: [] });

describe('Post', () => {
  describe('Actions', () => {
    const apollo = mockApollo();
    let actions: PostActions;

    beforeEach(() => {
      actions = new PostActions(apollo, ngRedux);
    });

    // TODO
  });
  describe('Reducer', () => {
    // TODO
  });
});
