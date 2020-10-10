import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRrtComponent } from './add-rrt.component';

describe('AddRrtComponent', () => {
  let component: AddRrtComponent;
  let fixture: ComponentFixture<AddRrtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRrtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
