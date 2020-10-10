import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartAgeWiseComponent } from './piechart-age-wise.component';

describe('PiechartAgeWiseComponent', () => {
  let component: PiechartAgeWiseComponent;
  let fixture: ComponentFixture<PiechartAgeWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiechartAgeWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiechartAgeWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
