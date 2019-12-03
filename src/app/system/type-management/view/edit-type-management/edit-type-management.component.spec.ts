import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeManagementComponent } from './edit-type-management.component';

describe('EditTypeManagementComponent', () => {
  let component: EditTypeManagementComponent;
  let fixture: ComponentFixture<EditTypeManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTypeManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTypeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
