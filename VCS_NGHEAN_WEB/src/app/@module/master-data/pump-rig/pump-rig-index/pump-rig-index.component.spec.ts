import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpRigIndexComponent } from './pump-rig-index.component';

describe('PumpRigIndexComponent', () => {
  let component: PumpRigIndexComponent;
  let fixture: ComponentFixture<PumpRigIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PumpRigIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PumpRigIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
