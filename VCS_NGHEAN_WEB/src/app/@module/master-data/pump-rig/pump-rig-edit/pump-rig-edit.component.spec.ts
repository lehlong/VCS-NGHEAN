import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpRigEditComponent } from './pump-rig-edit.component';

describe('PumpRigEditComponent', () => {
  let component: PumpRigEditComponent;
  let fixture: ComponentFixture<PumpRigEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PumpRigEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PumpRigEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
