import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalBannerListComponent } from './portal-banner-list.component';

describe('PortalBannerListComponent', () => {
  let component: PortalBannerListComponent;
  let fixture: ComponentFixture<PortalBannerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalBannerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalBannerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
