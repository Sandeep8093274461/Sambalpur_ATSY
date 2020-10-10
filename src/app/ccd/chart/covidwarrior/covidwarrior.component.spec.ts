import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidwarriorComponent } from './covidwarrior.component';

describe('CovidwarriorComponent', () => {
  let component: CovidwarriorComponent;
  let fixture: ComponentFixture<CovidwarriorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidwarriorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidwarriorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
