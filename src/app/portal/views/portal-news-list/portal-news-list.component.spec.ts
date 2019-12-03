import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalNewsListComponent } from './portal-news-list.component';

describe('PortalNewsListComponent', () => {
  let component: PortalNewsListComponent;
  let fixture: ComponentFixture<PortalNewsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalNewsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
