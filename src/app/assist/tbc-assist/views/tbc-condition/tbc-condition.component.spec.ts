import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TbcConditionComponent } from './tbc-condition.component';

describe('TbcConditionComponent', () => {
  let component: TbcConditionComponent;
  let fixture: ComponentFixture<TbcConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TbcConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TbcConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
