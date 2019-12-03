import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewheaderComponent } from './newheader.component';

describe('NewheaderComponent', () => {
  let component: NewheaderComponent;
  let fixture: ComponentFixture<NewheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
