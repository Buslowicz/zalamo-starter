/* tslint:disable:no-unused-variable */
/* 3rd party modules */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/* C&C Modules */
import { mockActivatedRoute, mockNgRedux } from '../../common/mocks';

/* Post module pieces */
import { mockPostActions } from '../post.spec';
import { PostActions } from '../post.actions';

/* Test view */
import { PostTestView } from './test.view';
import { AppState } from '../../../types/index';
import { NgRedux } from '@angular-redux/store';

const { ngRedux, mediator } = mockNgRedux<AppState>({ posts: [] });
const activatedRoute = mockActivatedRoute();

describe('Post', () => {
  describe('PostTestView', () => {
    let component: PostTestView;
    let fixture: ComponentFixture<PostTestView>;
    let element: HTMLElement;
    let debug: DebugElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          PostTestView
        ],
        providers: [
          { provide: ActivatedRoute, useValue: activatedRoute },
          { provide: PostActions, useValue: mockPostActions() }
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      NgRedux.instance = ngRedux;

      fixture = TestBed.createComponent(PostTestView);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
      debug = fixture.debugElement;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
