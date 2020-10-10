import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteHealthCaresComponent } from './remote-health-cares.component';

describe('RemoteHealthCaresComponent', () => {
  let component: RemoteHealthCaresComponent;
  let fixture: ComponentFixture<RemoteHealthCaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteHealthCaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteHealthCaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
