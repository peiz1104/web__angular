import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalNewsViewComponent } from './portal-news-view.component';

describe('PortalNewsViewComponent', () => {
  let component: PortalNewsViewComponent;
  let fixture: ComponentFixture<PortalNewsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalNewsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalNewsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
