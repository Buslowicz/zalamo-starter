/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgRedux } from '@angular-redux/store';

import { PostsViewComponent } from './posts.view';
import { AppState } from '../../../types';
import { PostsActions } from '../posts.actions';
import { mockNgRedux } from '../../common/mocks';
import { mockPostsActions } from '../posts.spec';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const { ngRedux, mediator } = mockNgRedux<AppState>({ posts: [] });

const postsActions = mockPostsActions();

describe('Posts', () => {
  describe('Posts View', () => {
    let component: PostsViewComponent;
    let fixture: ComponentFixture<PostsViewComponent>;
    let element: HTMLElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          PostsViewComponent
        ],
        providers: [
          { provide: PostsActions, useValue: postsActions },
          { provide: NgRedux, useValue: ngRedux },
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      NgRedux.instance = ngRedux;

      fixture = TestBed.createComponent(PostsViewComponent);
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

    it('should subscribe to data correctly', (done) => {
      component.posts$.first().subscribe((value) => {
        expect(value).toEqual([ 1, 2, 3 ]);
        done();
      });
      mediator.next({ posts: [ 1, 2, 3 ] });
    });
  });
});
