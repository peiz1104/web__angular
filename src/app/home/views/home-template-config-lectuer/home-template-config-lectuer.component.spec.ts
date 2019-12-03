import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTemplateConfigLectuerComponent } from './home-template-config-lectuer.component';

describe('HomeTemplateConfigLectuerComponent', () => {
  let component: HomeTemplateConfigLectuerComponent;
  let fixture: ComponentFixture<HomeTemplateConfigLectuerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTemplateConfigLectuerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTemplateConfigLectuerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
