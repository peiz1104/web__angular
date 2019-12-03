import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdinaryForumComponent } from './ordinary-forum.component';

describe('OrdinaryForumComponent', () => {
  let component: OrdinaryForumComponent;
  let fixture: ComponentFixture<OrdinaryForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdinaryForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdinaryForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
