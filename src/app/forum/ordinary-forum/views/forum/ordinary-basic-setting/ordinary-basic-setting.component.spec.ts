import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdinaryBasicSettingComponent } from './ordinary-basic-setting.component';

describe('OrdinaryBasicSettingComponent', () => {
  let component: OrdinaryBasicSettingComponent;
  let fixture: ComponentFixture<OrdinaryBasicSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdinaryBasicSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdinaryBasicSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
