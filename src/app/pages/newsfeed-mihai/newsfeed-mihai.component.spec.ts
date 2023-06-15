import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsfeedMihaiComponent } from './newsfeed-mihai.component';

describe('NewsfeedMihaiComponent', () => {
  let component: NewsfeedMihaiComponent;
  let fixture: ComponentFixture<NewsfeedMihaiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsfeedMihaiComponent]
    });
    fixture = TestBed.createComponent(NewsfeedMihaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
