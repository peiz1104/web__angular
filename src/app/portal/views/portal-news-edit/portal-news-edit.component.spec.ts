import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalNewsEditComponent } from './portal-news-edit.component';

describe('PortalNewsEditComponent', () => {
  let component: PortalNewsEditComponent;
  let fixture: ComponentFixture<PortalNewsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalNewsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalNewsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
