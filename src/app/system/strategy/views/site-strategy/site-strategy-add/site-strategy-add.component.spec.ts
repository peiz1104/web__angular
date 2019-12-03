import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteStrategyAddComponent } from './site-strategy-add.component';

describe('SiteStrategyAddComponent', () => {
  let component: SiteStrategyAddComponent;
  let fixture: ComponentFixture<SiteStrategyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteStrategyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteStrategyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
