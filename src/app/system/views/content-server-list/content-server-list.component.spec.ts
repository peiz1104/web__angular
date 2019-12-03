import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentServerListComponent } from './content-server-list.component';

describe('ContentServerListComponent', () => {
  let component: ContentServerListComponent;
  let fixture: ComponentFixture<ContentServerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentServerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentServerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
