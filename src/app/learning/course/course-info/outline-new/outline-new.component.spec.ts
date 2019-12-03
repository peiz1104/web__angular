import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutlineNewComponent } from './outline-new.component';

describe('OutlineNewComponent', () => {
  let component: OutlineNewComponent;
  let fixture: ComponentFixture<OutlineNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutlineNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutlineNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
