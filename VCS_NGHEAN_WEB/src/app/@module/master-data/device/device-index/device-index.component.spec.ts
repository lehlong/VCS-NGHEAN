import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceIndexComponent } from './device-index.component';

describe('DeviceIndexComponent', () => {
  let component: DeviceIndexComponent;
  let fixture: ComponentFixture<DeviceIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
