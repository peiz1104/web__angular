import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperAddTestComponent } from './paper-add-test.component';

describe('PaperAddTestComponent', () => {
  let component: PaperAddTestComponent;
  let fixture: ComponentFixture<PaperAddTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperAddTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperAddTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
