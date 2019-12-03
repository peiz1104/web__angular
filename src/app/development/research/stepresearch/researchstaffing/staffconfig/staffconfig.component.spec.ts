import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffconfigComponent } from './staffconfig.component';

describe('StaffconfigComponent', () => {
  let component: StaffconfigComponent;
  let fixture: ComponentFixture<StaffconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
