import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraIndexComponent } from './camera-index.component';

describe('CameraIndexComponent', () => {
  let component: CameraIndexComponent;
  let fixture: ComponentFixture<CameraIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CameraIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
