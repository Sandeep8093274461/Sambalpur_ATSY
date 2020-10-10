import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcdHeaderComponent } from './ccd-header.component';

describe('CcdHeaderComponent', () => {
  let component: CcdHeaderComponent;
  let fixture: ComponentFixture<CcdHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcdHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcdHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
