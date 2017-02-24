/* 3rd party modules */
import { Subject } from 'rxjs';

/* C&C */
import { mockApollo } from '../common/mocks';

/* About module pieces */
import { AboutActions } from './about.actions';
import { aboutReducer } from './about.reducer';

/**
 * Function to generate AboutActions mocking object
 */
export const mockAboutActions = () => {
  const s = new Subject();
  return <any> {
    // fetchAbout: () => s,
  };
};

describe('About', () => {
  describe('Actions', () => {
    const apollo = mockApollo();
    let actions: AboutActions;

    beforeEach(() => {
      actions = new AboutActions(apollo, null);
    });

    // TODO
  });
  describe('Reducer', () => {
    // TODO
  });
});
