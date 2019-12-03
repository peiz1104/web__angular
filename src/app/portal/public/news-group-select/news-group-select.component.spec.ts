import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsGroupSelectComponent } from './news-group-select.component';

describe('NewsGroupSelectComponent', () => {
  let component: NewsGroupSelectComponent;
  let fixture: ComponentFixture<NewsGroupSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsGroupSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsGroupSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
