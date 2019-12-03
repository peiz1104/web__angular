import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedtrainfeeComponent } from './redtrainfee.component';

describe('RedtrainfeeComponent', () => {
  let component: RedtrainfeeComponent;
  let fixture: ComponentFixture<RedtrainfeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedtrainfeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedtrainfeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
