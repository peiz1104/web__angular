import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixFillOptionComponent } from './matrix-fill-option.component';

describe('MatrixFillOptionComponent', () => {
  let component: MatrixFillOptionComponent;
  let fixture: ComponentFixture<MatrixFillOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixFillOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixFillOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
