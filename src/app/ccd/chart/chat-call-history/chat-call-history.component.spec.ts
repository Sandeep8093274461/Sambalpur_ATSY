import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCallHistoryComponent } from './chat-call-history.component';

describe('ChatCallHistoryComponent', () => {
  let component: ChatCallHistoryComponent;
  let fixture: ComponentFixture<ChatCallHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatCallHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatCallHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
