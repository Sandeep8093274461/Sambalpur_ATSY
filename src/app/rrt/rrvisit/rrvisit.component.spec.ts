import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RrvisitComponent } from './rrvisit.component';

describe('RrvisitComponent', () => {
  let component: RrvisitComponent;
  let fixture: ComponentFixture<RrvisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RrvisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RrvisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
