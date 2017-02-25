/* tslint:disable:no-unused-variable */
/* 3rd party modules */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/* C&C Modules */
import { RouterLinkStubDirective, mockActivatedRoute } from '../../common/mocks';

/* About module pieces */
import { mockAboutActions } from '../about.spec';
import { AboutActions } from '../about.actions';

/* Page View */
import { AboutPageView } from './page.view';

const activatedRoute = mockActivatedRoute();

describe('About', () => {
  describe('AboutPageView', () => {
    let component: AboutPageView;
    let fixture: ComponentFixture<AboutPageView>;
    let element: HTMLElement;
    let debug: DebugElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          AboutPageView,
          RouterLinkStubDirective
        ],
        providers: [
          { provide: ActivatedRoute, useValue: activatedRoute },
          { provide: AboutActions, useValue: mockAboutActions() }
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(AboutPageView);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
      debug = fixture.debugElement;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
