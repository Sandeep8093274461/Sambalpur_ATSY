import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartForMaleFemaleComponent } from './piechart-for-male-female.component';

describe('PiechartForMaleFemaleComponent', () => {
  let component: PiechartForMaleFemaleComponent;
  let fixture: ComponentFixture<PiechartForMaleFemaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiechartForMaleFemaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiechartForMaleFemaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
