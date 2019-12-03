import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperViewComponent } from './paper-view.component';

describe('PaperViewComponent', () => {
  let component: PaperViewComponent;
  let fixture: ComponentFixture<PaperViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
