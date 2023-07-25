import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';
import {PumpRigService} from 'src/app/services/MD/pump-rig.service';
import {AreaService} from 'src/app/services/MD/area.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {UnitService} from 'src/app/services/MD/unit.service';
import { UserTypeService } from 'src/app/services/MD/user-type.service';
import {utils} from 'src/app/utils/utils';
import { optionsArea } from 'src/app/@filter/MD/pump-rig-filter.model';

@Component({
  selector: 'app-pump-rig-edit',
  templateUrl: './pump-rig-edit.component.html',
  styleUrls: ['./pump-rig-edit.component.scss'],
})
export class PumpRigEditComponent {
  PumpRigForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  areaCode : string = '';
  isActive: boolean | null = null;
  areaName: string = '';
  
  filterArea = new BaseFilter();
  optionsArea: optionsArea[] = [];

  constructor(
    private _prs: PumpRigService,
    private _fb: FormBuilder,
    private _as: AreaService,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.PumpRigForm = this._fb.group({
      code: [{value: '', disabled: true}],
      name: ['', [Validators.required, this.utils.trimSpace]],
      isActive: ['', Validators.required],
      areaCode: ['', Validators.required],
    });
  }

  get f() {
    return this.PumpRigForm.controls;
  }

  ngOnInit() {
    this.PumpRigForm?.get('code')?.setValue(this.code);
    this.PumpRigForm?.get('name')?.setValue(this.name);
    this.PumpRigForm?.get('areaCode')?.setValue(this.areaCode);
    this.PumpRigForm?.get('isActive')?.setValue(this.isActive);
    this.getAllArea();
  }

  getAllArea() {
    this.filterArea.pageSize = 100;
    this._as.search(this.filterArea).subscribe({
      next: ({data}) => {
        this.optionsArea = data.data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
  close() {
    this.drawerService.close();
    this.PumpRigForm?.get('code')?.setValue('');
    this.PumpRigForm?.get('name')?.setValue('');
    this.PumpRigForm?.get('areaCode')?.setValue('');
    this.PumpRigForm?.get('isActive')?.setValue(true);
  }

  onChangeArea(e: any) {
    this.filterArea.keyWord = e;
    this.getAllArea();
  }

  onSelectArea(item: any) {
    this.PumpRigForm?.get('areaCode')?.setValue(item.code);
  }

  onEdit() {
    this.submitted = true;
    if (this.PumpRigForm.invalid) {
      return;
    }
    this._prs
      .Update(
        {
          code: this.PumpRigForm.value.code,
          name: this.PumpRigForm.value.name,
          areaCode: this.PumpRigForm.value.areaCode,
          isActive: this.PumpRigForm.value.isActive,
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
