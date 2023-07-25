import {Component} from '@angular/core';
import {UserTypeService} from 'src/app/services/MD/user-type.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/user-type-filter.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Component({
  selector: 'app-UserType-create',
  templateUrl: './user-type-create.component.html',
  styleUrls: ['./user-type-create.component.scss'],
})
export class UserTypeCreateComponent {
  UserTypeForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: UserTypeService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.UserTypeForm = this._fb.group({
      id: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
    });
  }

  get f() {
    return this.UserTypeForm.controls;
  }

  close() {
    this.drawerService.close();
    this.UserTypeForm?.get('id')?.setValue('');
    this.UserTypeForm?.get('name')?.setValue('');
    this.UserTypeForm?.get('isActive')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;
    if (this.UserTypeForm.invalid) {
      return;
    }
    this._service
      .Insert(
        {
          id: this.UserTypeForm.value.id.trim(),
          name: this.UserTypeForm.value.name.trim(),
          isActive: this.UserTypeForm.value.isActive,
        },
        false,
      )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          this.UserTypeForm?.get('id')?.setValue('');
          this.UserTypeForm?.get('name')?.setValue('');
          this.UserTypeForm?.get('isActive')?.setValue(true);
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
