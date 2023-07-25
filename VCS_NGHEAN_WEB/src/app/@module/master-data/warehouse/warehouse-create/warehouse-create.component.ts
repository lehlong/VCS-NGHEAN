import {Component} from '@angular/core';
import {WareHouseService} from 'src/app/services/MD/warehouse.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/area-filter.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Component({
  selector: 'app-warehouse-create',
  templateUrl: './warehouse-create.component.html',
  styleUrls: ['./warehouse-create.component.scss'],
})
export class WarehouseCreateComponent {
  whForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: WareHouseService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.whForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
    });
  }

  get f() {
    return this.whForm.controls;
  }

  close() {
    this.drawerService.close();
    this.whForm?.get('code')?.setValue('');
    this.whForm?.get('name')?.setValue('');
    this.whForm?.get('isActive')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;
    if (this.whForm.invalid) {
      return;
    }
    this._service
      .Insert(
        {
          code: this.whForm.value.code.trim(),
          name: this.whForm.value.name.trim(),
          isActive: this.whForm.value.isActive,
        },
        false,
      )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          this.whForm?.get('code')?.setValue('');
          this.whForm?.get('name')?.setValue('');
          this.whForm?.get('isActive')?.setValue(true);
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
