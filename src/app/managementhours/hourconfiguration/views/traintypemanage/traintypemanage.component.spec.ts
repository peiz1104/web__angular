import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraintypemanageComponent } from './traintypemanage.component';

describe('TraintypemanageComponent', () => {
  let component: TraintypemanageComponent;
  let fixture: ComponentFixture<TraintypemanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraintypemanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraintypemanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
