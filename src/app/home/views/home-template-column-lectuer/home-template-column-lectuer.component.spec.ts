import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTemplateColumnLectuerComponent } from './home-template-column-lectuer.component';

describe('HomeTemplateColumnLectuerComponent', () => {
  let component: HomeTemplateColumnLectuerComponent;
  let fixture: ComponentFixture<HomeTemplateColumnLectuerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTemplateColumnLectuerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTemplateColumnLectuerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
