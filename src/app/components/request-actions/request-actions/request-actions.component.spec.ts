import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestActionsComponent } from './request-actions.component';

describe('RequestActionsComponent', () => {
  let component: RequestActionsComponent;
  let fixture: ComponentFixture<RequestActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestActionsComponent]
    });
    fixture = TestBed.createComponent(RequestActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
