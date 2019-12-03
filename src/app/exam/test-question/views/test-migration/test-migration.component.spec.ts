import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMigrationComponent } from './test-migration.component';

describe('TestMigrationComponent', () => {
  let component: TestMigrationComponent;
  let fixture: ComponentFixture<TestMigrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestMigrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
