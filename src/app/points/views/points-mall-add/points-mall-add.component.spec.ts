import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsMallAddComponent } from './points-mall-add.component';

describe('UserAddComponent', () => {
  let component: PointsMallAddComponent;
  let fixture: ComponentFixture<PointsMallAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsMallAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsMallAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
