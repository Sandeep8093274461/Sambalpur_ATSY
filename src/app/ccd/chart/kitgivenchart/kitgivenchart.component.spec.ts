import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitgivenchartComponent } from './kitgivenchart.component';

describe('KitgivenchartComponent', () => {
  let component: KitgivenchartComponent;
  let fixture: ComponentFixture<KitgivenchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitgivenchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitgivenchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
