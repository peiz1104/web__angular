import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingRecordsPushComponent } from './teaching-records-push.component';

describe('TeachingRecordsPushComponent', () => {
  let component: TeachingRecordsPushComponent;
  let fixture: ComponentFixture<TeachingRecordsPushComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachingRecordsPushComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachingRecordsPushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
