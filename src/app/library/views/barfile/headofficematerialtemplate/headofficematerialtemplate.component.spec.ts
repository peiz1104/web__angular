import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadofficematerialtemplateComponent } from './headofficematerialtemplate.component';

describe('HeadofficematerialtemplateComponent', () => {
  let component: HeadofficematerialtemplateComponent;
  let fixture: ComponentFixture<HeadofficematerialtemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadofficematerialtemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadofficematerialtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
