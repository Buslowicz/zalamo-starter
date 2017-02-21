/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgRedux } from '@angular-redux/store';

import { PostDetailsViewComponent } from './post-details.view';
import { AppState } from '../../../types';
import { mockNgRedux, mockActivatedRoute } from '../../common/mocks';
import { FallbackPipe } from '../../common';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PostsActions } from '../posts.actions';
import { mockPostsActions } from '../posts.spec';

const { ngRedux, mediator } = mockNgRedux<AppState>({ posts: [] });
const activatedRoute = mockActivatedRoute();
const routerSubject = activatedRoute.params;

describe('Posts', () => {
  describe('Post Details View', () => {
    let component: PostDetailsViewComponent;
    let fixture: ComponentFixture<PostDetailsViewComponent>;
    let element: HTMLElement;

    const post = {
      id: 0,
      title: 'test',
      votes: 5,
      author: {
        id: 1,
        firstName: 'bob',
        lastName: 'tester'
      }
    };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          FallbackPipe,
          PostDetailsViewComponent
        ],
        providers: [
          { provide: PostsActions, useValue: mockPostsActions() },
          { provide: ActivatedRoute, useValue: activatedRoute },
          { provide: NgRedux, useValue: ngRedux }
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      NgRedux.instance = ngRedux;

      fixture = TestBed.createComponent(PostDetailsViewComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;

      // running ngOnInit
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have a data subscription', () => {
      expect(component[ '_sub' ].unsubscribe).toBeDefined();
    });

    it('should update the post according to route param', (done) => {
      let post$;
      component['actions'].byId = component['actions'].byId.bind({store: ngRedux});
      Object.defineProperty(component, 'post$', {
        get: () => post$,
        set: (newSub) => {
          post$ = newSub;
          post$.first().subscribe((item) => {
            expect(item.title).toEqual('the title');
            done();
          });
          mediator.next({
            posts: [
              { id: 1, title: 'the title' },
              { id: 2, title: 'test' }
            ]
          });
        }
      });
      routerSubject.next({ id: 1 });
    });
  });
});
