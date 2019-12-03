import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTemplateConfigBannerComponent } from './home-template-config-banner.component';

describe('HomeTemplateConfigBannerComponent', () => {
  let component: HomeTemplateConfigBannerComponent;
  let fixture: ComponentFixture<HomeTemplateConfigBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTemplateConfigBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTemplateConfigBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
