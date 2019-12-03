import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTemplateColumnBannerComponent } from './home-template-column-banner.component';

describe('HomeTemplateColumnBannerComponent', () => {
  let component: HomeTemplateColumnBannerComponent;
  let fixture: ComponentFixture<HomeTemplateColumnBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTemplateColumnBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTemplateColumnBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
