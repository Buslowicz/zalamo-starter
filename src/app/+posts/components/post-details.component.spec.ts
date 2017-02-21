/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostDetailsComponent } from './post-details.component';
import { Post } from '../../../types/graphql';

describe('Posts', () => {
  describe('Post Details Component', () => {
    let component: PostDetailsComponent;
    let fixture: ComponentFixture<PostDetailsComponent>;
    let element: HTMLElement;
    let debug: DebugElement;

    const post = <Post> {
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
          PostDetailsComponent
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PostDetailsComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
      debug = fixture.debugElement;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should react to property change', () => {
      component.post = post;
      fixture.detectChanges();
      expect(debug.query(By.css('h2')).nativeElement.textContent).toEqual('test (5)');
      expect(debug.query(By.css('h3')).nativeElement.textContent).toEqual('bob tester');
    });

    it('should return concatenated name and last name from `printName` method', () => {
      expect(component.printName(post.author)).toEqual('bob tester');
    });
  });
});
