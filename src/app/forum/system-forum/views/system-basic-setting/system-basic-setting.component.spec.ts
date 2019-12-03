import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemBasicSettingComponent } from './system-basic-setting.component';

describe('SystemBasicSettingComponent', () => {
  let component: SystemBasicSettingComponent;
  let fixture: ComponentFixture<SystemBasicSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemBasicSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemBasicSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
