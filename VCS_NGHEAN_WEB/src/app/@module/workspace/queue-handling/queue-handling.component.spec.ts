import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueHandlingComponent } from './queue-handling.component';

describe('QueueHandlingComponent', () => {
  let component: QueueHandlingComponent;
  let fixture: ComponentFixture<QueueHandlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueueHandlingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueueHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
