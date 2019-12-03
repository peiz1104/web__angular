import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTemplateColumnComponent } from './home-template-column.component';

describe('HomeTemplateColumnComponent', () => {
  let component: HomeTemplateColumnComponent;
  let fixture: ComponentFixture<HomeTemplateColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTemplateColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTemplateColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
