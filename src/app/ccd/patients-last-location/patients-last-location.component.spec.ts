import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsLastLocationComponent } from './patients-last-location.component';

describe('PatientsLastLocationComponent', () => {
  let component: PatientsLastLocationComponent;
  let fixture: ComponentFixture<PatientsLastLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientsLastLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsLastLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
