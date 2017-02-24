/* tslint:disable:no-unused-variable */
/* 3rd party modules */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

/* C&C */
import { mockActivatedRoute } from '../../common/mocks';

/* Post module pieces */
import { mockPostActions } from '../post.spec';
import { PostActions } from '../post.actions';

/* Detail View */
import { PostDetailView } from './detail.view';
import { ActivatedRoute } from '@angular/router';

const activatedRoute = mockActivatedRoute();

describe('Post', () => {
  describe('PostDetailView', () => {
    let component: PostDetailView;
    let fixture: ComponentFixture<PostDetailView>;
    let element: HTMLElement;
    let debug: DebugElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          PostDetailView
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
      fixture = TestBed.createComponent(PostDetailView);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
      debug = fixture.debugElement;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
