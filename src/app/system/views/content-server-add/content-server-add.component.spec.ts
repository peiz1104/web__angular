import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentServerAddComponent } from './content-server-add.component';

describe('ContentServerAddComponent', () => {
  let component: ContentServerAddComponent;
  let fixture: ComponentFixture<ContentServerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentServerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentServerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
