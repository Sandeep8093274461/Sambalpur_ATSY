import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRrtComponent } from './update-rrt.component';

describe('UpdateRrtComponent', () => {
  let component: UpdateRrtComponent;
  let fixture: ComponentFixture<UpdateRrtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRrtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
