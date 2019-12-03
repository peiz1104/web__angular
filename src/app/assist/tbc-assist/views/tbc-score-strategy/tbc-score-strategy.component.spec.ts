import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TbcScoreStrategyComponent } from './tbc-score-strategy.component';

describe('TbcScoreStrategyComponent', () => {
  let component: TbcScoreStrategyComponent;
  let fixture: ComponentFixture<TbcScoreStrategyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TbcScoreStrategyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TbcScoreStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
