import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { UgcActivityWorkAddComponent } from './ugc-activity-work-add.component';

describe('UgcActivityWorkAddComponent', () => {
  let component: UgcActivityWorkAddComponent;
    let fixture: ComponentFixture<UgcActivityWorkAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [UgcActivityWorkAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgcActivityWorkAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
