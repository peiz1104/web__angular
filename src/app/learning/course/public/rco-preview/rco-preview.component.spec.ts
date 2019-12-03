import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcoPreviewComponent } from './rco-preview.component';

describe('RcoPreviewComponent', () => {
  let component: RcoPreviewComponent;
  let fixture: ComponentFixture<RcoPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcoPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcoPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
