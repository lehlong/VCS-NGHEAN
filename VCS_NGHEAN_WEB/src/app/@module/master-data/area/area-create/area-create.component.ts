import {Component} from '@angular/core';
import {AreaService} from 'src/app/services/MD/area.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/area-filter.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Component({
  selector: 'app-area-create',
  templateUrl: './area-create.component.html',
  styleUrls: ['./area-create.component.scss'],
})
export class AreaCreateComponent {
  areaForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: AreaService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.areaForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      dbTgbx: ['', [ this.utils.trimSpace]],
      dbTdh: ['', [ this.utils.trimSpace]],
      dbTdhE5: ['', [this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
    });
  }

  get f() {
    return this.areaForm.controls;
  }

  close() {
    this.drawerService.close();
    this.areaForm?.get('code')?.setValue('');
    this.areaForm?.get('name')?.setValue('');
    this.areaForm?.get('dbTgbx')?.setValue('');
    this.areaForm?.get('dbTdh')?.setValue('');
    this.areaForm?.get('dbTdhE5')?.setValue('');
    this.areaForm?.get('isActive')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;
    if (this.areaForm.invalid) {
      return;
    }
    this._service
      .Insert(
        {
          code: this.areaForm.value.code.trim(),
          name: this.areaForm.value.name.trim(),
          dbTgbx: this.areaForm.value.dbTgbx.trim(),
          dbTdh: this.areaForm.value.dbTdh.trim(),
          dbTdhE5: this.areaForm.value.dbTdhE5.trim(),
          isActive: this.areaForm.value.isActive,
        },
        false,
      )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          this.areaForm?.get('code')?.setValue('');
          this.areaForm?.get('name')?.setValue('');
          this.areaForm?.get('dbTgbx')?.setValue('');
          this.areaForm?.get('dbTdh')?.setValue('');
          this.areaForm?.get('dbTdhE5')?.setValue('');
          this.areaForm?.get('isActive')?.setValue(true);
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
