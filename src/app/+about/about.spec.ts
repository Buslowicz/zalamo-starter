/* tslint:disable:no-unused-variable */
/* C&C Modules */
import { mockApollo, mockNgRedux } from '../common/mocks';

/* About module pieces */
import { AboutActions } from './about.actions';

/* Types */
import { AboutState } from './about.reducer';

/**
 * Function to generate AboutActions mocking object
 */
export const mockAboutActions = () => {
  // const s = new Subject();
  return <any> {
    // fetchAbout: () => s,
  };
};

const { ngRedux, mediator } = mockNgRedux<{ about: AboutState }>({ about: [] });

describe('About', () => {
  describe('Actions', () => {
    let actions: AboutActions;

    beforeEach(() => {
      actions = new AboutActions(ngRedux);
    });

    // TODO
  });
  describe('Reducer', () => {
    // TODO
  });
});
