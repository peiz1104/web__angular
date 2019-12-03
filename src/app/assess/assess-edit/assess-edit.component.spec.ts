import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessEditComponent } from './assess-edit.component';

describe('AssessEditComponent', () => {
  let component: AssessEditComponent;
  let fixture: ComponentFixture<AssessEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
