import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentServerEditComponent } from './content-server-edit.component';

describe('ContentServerEditComponent', () => {
  let component: ContentServerEditComponent;
  let fixture: ComponentFixture<ContentServerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentServerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentServerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
