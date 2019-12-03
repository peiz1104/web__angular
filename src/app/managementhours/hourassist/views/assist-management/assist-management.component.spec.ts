import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistManagementComponent } from './assist-management.component';

describe('AssistManagementComponent', () => {
  let component: AssistManagementComponent;
  let fixture: ComponentFixture<AssistManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
