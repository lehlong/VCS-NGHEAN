import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpThroatCreateComponent } from './pump-throat-create.component';

describe('PumpThroatCreateComponent', () => {
  let component: PumpThroatCreateComponent;
  let fixture: ComponentFixture<PumpThroatCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PumpThroatCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PumpThroatCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
