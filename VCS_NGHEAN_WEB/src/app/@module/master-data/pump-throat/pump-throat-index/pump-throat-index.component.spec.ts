import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpThroatIndexComponent } from './pump-throat-index.component';

describe('PumpThroatIndexComponent', () => {
  let component: PumpThroatIndexComponent;
  let fixture: ComponentFixture<PumpThroatIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PumpThroatIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PumpThroatIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
