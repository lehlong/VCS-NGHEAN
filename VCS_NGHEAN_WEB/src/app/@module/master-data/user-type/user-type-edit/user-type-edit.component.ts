import {Component} from '@angular/core';
import {UserTypeService} from 'src/app/services/MD/user-type.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {UserTypeFilter} from 'src/app/@filter/MD/user-type-filter.model';
import {optionsGroup} from 'src/app/@filter/MD/user-type-filter.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Component({
  selector: 'app-UserType-edit',
  templateUrl: './user-type-edit.component.html',
  styleUrls: ['./user-type-edit.component.scss'],
})
export class UserTypeEditComponent {
  UserTypeForm: FormGroup;
  submitted: boolean = false;
  id: string = '';
  name: string = '';
  isActive: boolean | null = null;
  filter = new UserTypeFilter();
  optionsUserType: optionsGroup[] = [];
  filterUserType = new BaseFilter();

  constructor(
    private _service: UserTypeService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.UserTypeForm = this._fb.group({
      id: [{value: '', disabled: true}],
      name: ['', [Validators.required, this.utils.trimSpace]],
      isActive: ['', Validators.required],
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  get f() {
    return this.UserTypeForm.controls;
  }

  ngOnInit() {
    this.UserTypeForm?.get('id')?.setValue(this.id);
    this.UserTypeForm?.get('name')?.setValue(this.name);
    this.UserTypeForm?.get('isActive')?.setValue(this.isActive || false);
  }

  close() {
    this.filter = {
      ...this.filter,
      id: '',
      name: '',
      isActive: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
    this.UserTypeForm?.get('id')?.setValue('');
    this.UserTypeForm?.get('name')?.setValue('');
    this.UserTypeForm?.get('isActive')?.setValue(true);
  }

  onEdit() {
    this.submitted = true;
    if (this.UserTypeForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          id: this.id.trim(),
          name: this.UserTypeForm.value.name.trim(),
          isActive: this.UserTypeForm.value.isActive,
        },
        false,
      )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
