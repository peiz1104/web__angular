import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TbcDetailComponent } from './tbc-detail.component';

describe('TbcDetailComponent', () => {
  let component: TbcDetailComponent;
  let fixture: ComponentFixture<TbcDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TbcDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TbcDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
