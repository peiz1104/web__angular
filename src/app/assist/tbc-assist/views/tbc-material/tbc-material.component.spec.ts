import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TbcMaterialComponent } from './tbc-material.component';

describe('TbcMaterialComponent', () => {
  let component: TbcMaterialComponent;
  let fixture: ComponentFixture<TbcMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TbcMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TbcMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
