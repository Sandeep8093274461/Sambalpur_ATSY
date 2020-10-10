import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientfeedbackComponent } from './patientfeedback.component';

describe('PatientfeedbackComponent', () => {
  let component: PatientfeedbackComponent;
  let fixture: ComponentFixture<PatientfeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientfeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
