import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PateintListComponent } from './pateint-list.component';

describe('PateintListComponent', () => {
  let component: PateintListComponent;
  let fixture: ComponentFixture<PateintListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PateintListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PateintListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
