import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyIndexComponent } from './strategy-index.component';

describe('StrategyIndexComponent', () => {
  let component: StrategyIndexComponent;
  let fixture: ComponentFixture<StrategyIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrategyIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
