import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteStrategyListComponent } from './site-strategy-list.component';

describe('SiteStrategyListComponent', () => {
  let component: SiteStrategyListComponent;
  let fixture: ComponentFixture<SiteStrategyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteStrategyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteStrategyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
