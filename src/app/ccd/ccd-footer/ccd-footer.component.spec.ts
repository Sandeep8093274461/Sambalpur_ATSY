import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcdFooterComponent } from './ccd-footer.component';

describe('CcdFooterComponent', () => {
  let component: CcdFooterComponent;
  let fixture: ComponentFixture<CcdFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcdFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcdFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
