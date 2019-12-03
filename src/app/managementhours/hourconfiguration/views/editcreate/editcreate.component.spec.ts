import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcreateComponent } from './editcreate.component';

describe('EditcreateComponent', () => {
  let component: EditcreateComponent;
  let fixture: ComponentFixture<EditcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
