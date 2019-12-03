import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixOptionComponent } from './matrix-option.component';

describe('MatrixOptionComponent', () => {
  let component: MatrixOptionComponent;
  let fixture: ComponentFixture<MatrixOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
