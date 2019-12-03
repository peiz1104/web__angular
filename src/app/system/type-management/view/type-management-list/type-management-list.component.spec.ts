import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeManagementListComponent } from './type-management-list.component';

describe('TypeManagementListComponent', () => {
  let component: TypeManagementListComponent;
  let fixture: ComponentFixture<TypeManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeManagementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
