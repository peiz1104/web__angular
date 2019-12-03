import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcoItemEditComponent } from './rco-item-edit.component';

describe('RcoItemEditComponent', () => {
  let component: RcoItemEditComponent;
  let fixture: ComponentFixture<RcoItemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcoItemEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcoItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
