import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadofficefileComponent } from './headofficefile.component';

describe('HeadofficefileComponent', () => {
  let component: HeadofficefileComponent;
  let fixture: ComponentFixture<HeadofficefileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadofficefileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadofficefileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
