import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgcActivityForumComponent } from './ugc-activity-forum.component';

describe('UgcActivityForumComponent', () => {
  let component: UgcActivityForumComponent;
  let fixture: ComponentFixture<UgcActivityForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UgcActivityForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgcActivityForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
