import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTemplateConfigLogoComponent } from './home-template-config-logo.component';

describe('HomeTemplateConfigLogoComponent', () => {
  let component: HomeTemplateConfigLogoComponent;
  let fixture: ComponentFixture<HomeTemplateConfigLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTemplateConfigLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTemplateConfigLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
