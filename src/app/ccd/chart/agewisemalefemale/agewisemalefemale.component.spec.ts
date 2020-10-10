import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgewisemalefemaleComponent } from './agewisemalefemale.component';

describe('AgewisemalefemaleComponent', () => {
  let component: AgewisemalefemaleComponent;
  let fixture: ComponentFixture<AgewisemalefemaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgewisemalefemaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgewisemalefemaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
