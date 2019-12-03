import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteForumComponent } from './site-forum.component';

describe('SiteForumComponent', () => {
  let component: SiteForumComponent;
  let fixture: ComponentFixture<SiteForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
