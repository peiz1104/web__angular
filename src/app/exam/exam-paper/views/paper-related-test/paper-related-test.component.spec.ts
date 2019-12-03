import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperRelatedTestComponent } from './paper-related-test.component';

describe('PaperRelatedTestComponent', () => {
  let component: PaperRelatedTestComponent;
  let fixture: ComponentFixture<PaperRelatedTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperRelatedTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperRelatedTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
