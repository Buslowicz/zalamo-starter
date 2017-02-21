/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgRedux } from '@angular-redux/store';

import { CounterViewComponent } from './counter.view';
import { AppState } from '../../../types';
import { mockNgRedux } from '../../common/mocks';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const { ngRedux, mediator } = mockNgRedux<AppState>();

describe('Counter', () => {
  describe('View', () => {
    let component: CounterViewComponent;
    let fixture: ComponentFixture<CounterViewComponent>;
    let element: HTMLElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          CounterViewComponent
        ],
        providers: [
          { provide: NgRedux, useValue: ngRedux },
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CounterViewComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;

      NgRedux.instance = ngRedux;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should subscribe to data correctly', (done) => {
      component.counter$.first().subscribe((value) => {
        expect(value).toEqual(20);
        done();
      });
      mediator.next({ counter: 20 });
    });
  });
});
