import { Component } from '@angular/core';
import { AccountGroupService } from 'src/app/services/AD/account-group.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
@Component({
  selector: 'app-account-group-create',
  templateUrl: './account-group-create.component.html',
  styleUrls: ['./account-group-create.component.scss'],
})
export class AccountGroupCreateComponent {
  accountGroupForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private _service: AccountGroupService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService
  ) {
    this.accountGroupForm = this._fb.group({
      name: ['', [Validators.required, this.utils.trimSpace]],
      notes: '',
      state: 'true',
    });
  }

  get f() {
    return this.accountGroupForm.controls;
  }

  close() {
    this.drawerService.close();
    this.accountGroupForm?.get('name')?.setValue('');
    this.accountGroupForm?.get('notes')?.setValue('');
    this.accountGroupForm?.get('state')?.setValue('true');
  }

  onCreate() {
    this.submitted = true;
    if (this.accountGroupForm.invalid) {
      return;
    }
    console.log(this.accountGroupForm.value);
    this._service
      .Insert(
        {
          name: this.accountGroupForm.value.name.trim(),
          notes: this.accountGroupForm.value.notes.trim(),
          state: this.accountGroupForm.value.state === 'true',
        },
        false
      )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          this.accountGroupForm?.get('name')?.setValue('');
          this.accountGroupForm?.get('notes')?.setValue('');
          this.accountGroupForm?.get('state')?.setValue('true');
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
}
