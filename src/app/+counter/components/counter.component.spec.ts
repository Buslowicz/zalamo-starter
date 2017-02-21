/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponent } from './counter.component';
import { CounterActions } from '../counter.actions';
import { mockCounterActions } from '../counter.spec';

const CounterActionsMock = mockCounterActions();

describe('Counter', () => {
  describe('Component', () => {
    let component: CounterComponent;
    let fixture: ComponentFixture<CounterComponent>;
    let element: HTMLElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          CounterComponent
        ],
        providers: [
          { provide: CounterActions, useValue: CounterActionsMock }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CounterComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should react to property change', () => {
      component.counter = 20;
      fixture.detectChanges();
      expect(element.textContent).toContain('Clicked: 20 times');
    });
  });
});
