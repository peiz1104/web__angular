import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicSettingFormComponent } from './basic-setting-form.component';

describe('BasicSettingFormComponent', () => {
  let component: BasicSettingFormComponent;
  let fixture: ComponentFixture<BasicSettingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicSettingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicSettingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
