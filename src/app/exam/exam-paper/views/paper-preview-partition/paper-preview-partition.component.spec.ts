import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperPreviewPartitionComponent } from './paper-preview-partition.component';

describe('PaperPreviewPartitionComponent', () => {
  let component: PaperPreviewPartitionComponent;
  let fixture: ComponentFixture<PaperPreviewPartitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperPreviewPartitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperPreviewPartitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
