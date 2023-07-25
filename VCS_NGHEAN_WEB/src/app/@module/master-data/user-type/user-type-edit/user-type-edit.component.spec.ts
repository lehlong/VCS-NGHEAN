import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeEditComponent } from './user-type-edit.component';

describe('UserTypeEditComponent', () => {
  let component: UserTypeEditComponent;
  let fixture: ComponentFixture<UserTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTypeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
