import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TbcEditComponent } from './tbc-edit.component';

describe('TbcEditComponent', () => {
  let component: TbcEditComponent;
  let fixture: ComponentFixture<TbcEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TbcEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TbcEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
