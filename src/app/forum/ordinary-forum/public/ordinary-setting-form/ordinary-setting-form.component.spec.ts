import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdinarySettingFormComponent } from './ordinary-setting-form.component';

describe('OrdinarySettingFormComponent', () => {
  let component: OrdinarySettingFormComponent;
  let fixture: ComponentFixture<OrdinarySettingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdinarySettingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdinarySettingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
