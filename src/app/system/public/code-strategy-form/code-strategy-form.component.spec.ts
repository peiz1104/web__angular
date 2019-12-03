import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeStrategyFormComponent } from './code-strategy-form.component';

describe('CodeStrategyFormComponent', () => {
  let component: CodeStrategyFormComponent;
  let fixture: ComponentFixture<CodeStrategyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeStrategyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeStrategyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
