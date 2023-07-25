import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {optionsGroup, optionsUserType, optionsArea} from 'src/app/@filter/Common/account-filter.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';
import {AccountGroupService} from 'src/app/services/AD/account-group.service';
import {AccountService} from 'src/app/services/AD/account.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import { AreaService } from 'src/app/services/MD/area.service';
import {UnitService} from 'src/app/services/MD/unit.service';
import { UserTypeService } from 'src/app/services/MD/user-type.service';
import {utils} from 'src/app/utils/utils';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss'],
})
export class AccountEditComponent {
  accountForm: FormGroup;
  submitted: boolean = false;
  userName: string = '';
  fullName: string = '';
  phoneNumber : string = '';
  isActive: boolean | null = null;
  groupId: string = '';
  groupName: string = '';
  userType: string = '';
  userTypeName: string = '';
  email: string ='';
  address :string = '';
  areaCode :string = '';
  areaName :string = '';

  filterGroup = new BaseFilter();
  filterUserType = new BaseFilter();
  filterArea = new BaseFilter();

  optionsGroup: optionsGroup[] = [];
  optionsUserType: optionsUserType[] = [];
  optionsArea: optionsArea[] = [];

  constructor(
    private _as: AccountService,
    private _areas: AreaService,
    private _fb: FormBuilder,
    private _ags: AccountGroupService,
    private _uts: UserTypeService,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.accountForm = this._fb.group({
      userName: ['', Validators.required],
      fullName: ['', [Validators.required, this.utils.trimSpace]],
      phoneNumber: [],
      email: [],
      address: [],
      isActive: ['', Validators.required],
      groupId: ['', Validators.required],
      areaCode: ['', Validators.required],
      userType: ['', Validators.required],
    });
  }

  get f() {
    return this.accountForm.controls;
  }

  ngOnInit() {
    this.accountForm?.get('userName')?.setValue(this.userName);
    this.accountForm?.get('fullName')?.setValue(this.fullName);
    this.accountForm?.get('phoneNumber')?.setValue(this.phoneNumber);
    this.accountForm?.get('isActive')?.setValue(this.isActive);
    this.accountForm?.get('groupId')?.setValue(this.groupId);
    this.accountForm?.get('userType')?.setValue(this.userType);
    this.accountForm?.get('email')?.setValue(this.email);
    this.accountForm?.get('address')?.setValue(this.address);
    this.accountForm?.get('areaCode')?.setValue(this.areaCode);
    this.getAllGroup();
    this.getUserType();
    this.getAllArea();
  }

  getAllGroup() {
    this.filterGroup.pageSize = 100;
    this._ags.search(this.filterGroup).subscribe({
      next: ({data}) => {
        this.optionsGroup = data.data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  getAllArea() {
    this.filterArea.pageSize = 100;
    this._areas.search(this.filterArea).subscribe({
      next: ({data}) => {
        this.optionsArea = data.data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  getUserType() {
    this.filterUserType.pageSize = 100;
    this._uts.search(this.filterUserType).subscribe({
      next: ({data}) => {
        this.optionsUserType = data.data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  close() {
    this.drawerService.close();
    this.accountForm?.get('userName')?.setValue('');
    this.accountForm?.get('fullName')?.setValue('');
    this.accountForm?.get('phoneNumber')?.setValue('');
    this.accountForm?.get('isActive')?.setValue(true);
    this.accountForm?.get('groupId')?.setValue('');
    this.accountForm?.get('userType')?.setValue('');
    this.accountForm?.get('email')?.setValue('');
    this.accountForm?.get('address')?.setValue('');
    this.accountForm?.get('areaCode')?.setValue('');
  }

  onChangeGroup(e: any) {
    this.filterGroup.keyWord = e;
    this.getAllGroup();
  }

  onChangeUserType(e: any) {
    this.filterUserType.keyWord = e;
    this.getUserType();
  }

  onChangeArea(e: any) {
    this.filterArea.keyWord = e;
    this.getAllArea();
  }

  onSelectGroup(item: any) {
    this.accountForm?.get('groupId')?.setValue(item.id);
  }
  onSelectUserType(item: any) {
    this.accountForm?.get('userType')?.setValue(item.id);
  }
  onSelectArea(item: any) {
    this.accountForm?.get('areaCode')?.setValue(item.code);
  }

  onEdit() {
    this.submitted = true;
    if (this.accountForm.invalid) {
      return;
    }
    this._as
      .Update(
        {
          userName: this.accountForm.value.userName,
          fullName: this.accountForm.value.fullName,
          phoneNumber: this.accountForm.value.phoneNumber,
          groupId: this.accountForm.value.groupId,
          userType: this.accountForm.value.userType,
          email: this.accountForm.value.email,
          address: this.accountForm.value.address,
          isActive: this.accountForm.value.isActive,
          areaCode :this.accountForm.value.areaCode,
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
