import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourruleimportComponent } from './hourruleimport.component';

describe('HourruleimportComponent', () => {
  let component: HourruleimportComponent;
  let fixture: ComponentFixture<HourruleimportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourruleimportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourruleimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
