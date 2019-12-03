import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixFillBlankComponent } from './matrix-fill-blank.component';

describe('MatrixFillBlankComponent', () => {
  let component: MatrixFillBlankComponent;
  let fixture: ComponentFixture<MatrixFillBlankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixFillBlankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixFillBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
