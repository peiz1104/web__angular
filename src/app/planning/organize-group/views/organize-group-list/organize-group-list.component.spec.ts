import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizeGroupListComponent } from './organize-group-list.component';

describe('OrganizeGroupListComponent', () => {
  let component: OrganizeGroupListComponent;
  let fixture: ComponentFixture<OrganizeGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizeGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizeGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
