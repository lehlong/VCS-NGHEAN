import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpThroatEditComponent } from './pump-throat-edit.component';

describe('PumpThroatEditComponent', () => {
  let component: PumpThroatEditComponent;
  let fixture: ComponentFixture<PumpThroatEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PumpThroatEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PumpThroatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
