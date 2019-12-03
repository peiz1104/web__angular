import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpeachShowInfoComponent } from './impeach-show-info.component';

describe('ImpeachShowInfoComponent', () => {
  let component: ImpeachShowInfoComponent;
  let fixture: ComponentFixture<ImpeachShowInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpeachShowInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpeachShowInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
