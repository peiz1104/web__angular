import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeManagementComponent } from './add-type-management.component';

describe('AddTypeManagementComponent', () => {
  let component: AddTypeManagementComponent;
  let fixture: ComponentFixture<AddTypeManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
