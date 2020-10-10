import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsolationactiveCaseComponent } from './isolationactive-case.component';

describe('IsolationactiveCaseComponent', () => {
  let component: IsolationactiveCaseComponent;
  let fixture: ComponentFixture<IsolationactiveCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsolationactiveCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsolationactiveCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
