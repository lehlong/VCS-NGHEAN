import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInOutIndexComponent } from './check-in-out-index.component';

describe('CheckInOutIndexComponent', () => {
  let component: CheckInOutIndexComponent;
  let fixture: ComponentFixture<CheckInOutIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckInOutIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckInOutIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
