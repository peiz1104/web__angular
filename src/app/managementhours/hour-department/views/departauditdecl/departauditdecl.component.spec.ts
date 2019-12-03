import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartauditdeclComponent } from './departauditdecl.component';

describe('DepartauditdeclComponent', () => {
  let component: DepartauditdeclComponent;
  let fixture: ComponentFixture<DepartauditdeclComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartauditdeclComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartauditdeclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
