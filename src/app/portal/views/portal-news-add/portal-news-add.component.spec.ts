import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalNewsAddComponent } from './portal-news-add.component';

describe('PortalNewsAddComponent', () => {
  let component: PortalNewsAddComponent;
  let fixture: ComponentFixture<PortalNewsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalNewsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalNewsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
