import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentServerFormComponent } from './content-server-form.component';

describe('ContentServerFormComponent', () => {
  let component: ContentServerFormComponent;
  let fixture: ComponentFixture<ContentServerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentServerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentServerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
