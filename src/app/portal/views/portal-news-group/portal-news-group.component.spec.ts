import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalNewsGroupComponent } from './portal-news-group.component';

describe('PortalNewsGroupComponent', () => {
  let component: PortalNewsGroupComponent;
  let fixture: ComponentFixture<PortalNewsGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalNewsGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalNewsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
