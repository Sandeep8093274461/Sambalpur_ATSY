import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiteintentryComponent } from './paiteintentry.component';

describe('PaiteintentryComponent', () => {
  let component: PaiteintentryComponent;
  let fixture: ComponentFixture<PaiteintentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaiteintentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiteintentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
