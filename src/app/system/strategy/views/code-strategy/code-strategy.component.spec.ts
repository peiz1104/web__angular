import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeStrategyComponent } from './code-strategy.component';

describe('CodeStrategyComponent', () => {
  let component: CodeStrategyComponent;
  let fixture: ComponentFixture<CodeStrategyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeStrategyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
