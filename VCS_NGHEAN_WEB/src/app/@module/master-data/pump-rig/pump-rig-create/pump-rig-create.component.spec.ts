import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpRigCreateComponent } from './pump-rig-create.component';

describe('PumpRigCreateComponent', () => {
  let component: PumpRigCreateComponent;
  let fixture: ComponentFixture<PumpRigCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PumpRigCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PumpRigCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
