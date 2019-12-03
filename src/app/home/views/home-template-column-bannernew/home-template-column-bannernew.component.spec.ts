import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTemplateColumnBannernewComponent } from './home-template-column-bannernew.component';

describe('HomeTemplateColumnBannernewComponent', () => {
  let component: HomeTemplateColumnBannernewComponent;
  let fixture: ComponentFixture<HomeTemplateColumnBannernewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTemplateColumnBannernewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTemplateColumnBannernewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
