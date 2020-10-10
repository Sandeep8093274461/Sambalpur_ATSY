import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RrtHomepageComponent } from './rrt-homepage.component';

describe('RrtHomepageComponent', () => {
  let component: RrtHomepageComponent;
  let fixture: ComponentFixture<RrtHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RrtHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RrtHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
