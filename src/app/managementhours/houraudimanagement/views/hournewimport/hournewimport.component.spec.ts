import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HournewimportComponent } from './hournewimport.component';

describe('HournewimportComponent', () => {
  let component: HournewimportComponent;
  let fixture: ComponentFixture<HournewimportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HournewimportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HournewimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
