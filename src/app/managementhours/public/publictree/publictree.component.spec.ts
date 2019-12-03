import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublictreeComponent } from './publictree.component';

describe('PublictreeComponent', () => {
  let component: PublictreeComponent;
  let fixture: ComponentFixture<PublictreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublictreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublictreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
