import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonePatientLocationComponent } from './zone-patient-location.component';

describe('ZonePatientLocationComponent', () => {
  let component: ZonePatientLocationComponent;
  let fixture: ComponentFixture<ZonePatientLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonePatientLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonePatientLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
