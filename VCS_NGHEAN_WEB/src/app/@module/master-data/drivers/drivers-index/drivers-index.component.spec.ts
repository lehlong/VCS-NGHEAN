import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversIndexComponent } from './drivers-index.component';

describe('DriversIndexComponent', () => {
  let component: DriversIndexComponent;
  let fixture: ComponentFixture<DriversIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
