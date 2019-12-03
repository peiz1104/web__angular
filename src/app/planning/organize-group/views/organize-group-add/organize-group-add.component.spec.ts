import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizeGroupAddComponent } from './organize-group-add.component';

describe('OrganizeGroupAddComponent', () => {
  let component: OrganizeGroupAddComponent;
  let fixture: ComponentFixture<OrganizeGroupAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizeGroupAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizeGroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
