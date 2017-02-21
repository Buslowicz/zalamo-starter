/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { PostsComponent } from './posts.component';
import { mockPostsActions } from '../posts.spec';
import { PostsActions } from '../posts.actions';
import { RouterLinkStubDirective } from '../../common/mocks';

describe('Posts', () => {
  describe('Posts Component', () => {
    let component: PostsComponent;
    let fixture: ComponentFixture<PostsComponent>;
    let element: HTMLElement;
    let debug: DebugElement;

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
          PostsComponent,
          RouterLinkStubDirective
        ],
        providers: [
          { provide: PostsActions, useValue: mockPostsActions() }
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PostsComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
      debug = fixture.debugElement;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should react to property change', () => {
      component.posts = <any> [ post, post, post ];
      fixture.detectChanges();
      expect(debug.queryAll(By.css('li')).length).toEqual(3);
    });

    it('should print list with posts details', () => {
      component.posts = <any> [ post ];
      fixture.detectChanges();
      expect(debug.query(By.css('li')).nativeElement.textContent).toMatch(/test\s+by\s+bob\s+tester[\s\n]+5/);
      expect(debug.query(By.css('li > button')).nativeElement.textContent).toEqual('5');
    });

    it('should contain a button per list item', () => {
      component.posts = <any> [ post, post ];
      fixture.detectChanges();
      expect(debug.queryAll(By.css('li > button')).length).toEqual(2);
    });

    it('should contain a link to show more details per item', () => {
      component.posts = <any> [ post, Object.assign({}, post, { id: 1 }) ];
      fixture.detectChanges();
      expect(debug
        .queryAll(By.directive(RouterLinkStubDirective))
        .map((node) => node.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective)
        .map((node) => node.routerLink)
      ).toEqual([ [ '/posts', 0 ], [ '/posts', 1 ] ]);
    });
  });
});
