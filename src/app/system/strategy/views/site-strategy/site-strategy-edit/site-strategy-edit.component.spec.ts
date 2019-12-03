import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteStrategyEditComponent } from './site-strategy-edit.component';

describe('SiteStrategyEditComponent', () => {
  let component: SiteStrategyEditComponent;
  let fixture: ComponentFixture<SiteStrategyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteStrategyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteStrategyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
