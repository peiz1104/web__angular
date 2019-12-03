import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourdeclarationlistComponent } from './hourdeclarationlist.component';

describe('HourdeclarationlistComponent', () => {
  let component: HourdeclarationlistComponent;
  let fixture: ComponentFixture<HourdeclarationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourdeclarationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourdeclarationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
