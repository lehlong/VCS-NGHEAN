import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeIndexComponent } from './user-type-index.component';

describe('UserTypeIndexComponent', () => {
  let component: UserTypeIndexComponent;
  let fixture: ComponentFixture<UserTypeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTypeIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTypeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
