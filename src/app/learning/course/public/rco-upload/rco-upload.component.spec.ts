import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcoUploadComponent } from './rco-upload.component';

describe('RcoUploadComponent', () => {
  let component: RcoUploadComponent;
  let fixture: ComponentFixture<RcoUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcoUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcoUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
