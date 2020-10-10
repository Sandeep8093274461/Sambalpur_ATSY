import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcdSidebarComponent } from './ccd-sidebar.component';

describe('CcdSidebarComponent', () => {
  let component: CcdSidebarComponent;
  let fixture: ComponentFixture<CcdSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcdSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcdSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
