import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';
import { optionsArea } from 'src/app/@filter/MD/pump-rig-filter.model';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import { AreaService } from 'src/app/services/MD/area.service';
import { PumpRigService } from 'src/app/services/MD/pump-rig.service';
import {UnitService} from 'src/app/services/MD/unit.service';
import { UserTypeService } from 'src/app/services/MD/user-type.service';
import {utils} from 'src/app/utils/utils';

@Component({
  selector: 'app-pump-rig-create',
  templateUrl: './pump-rig-create.component.html',
  styleUrls: ['./pump-rig-create.component.scss'],
})
export class PumpRigCreateComponent implements OnInit {
  PumpRigForm: FormGroup;
  submitted: boolean = false;
  optionsArea: optionsArea[] = [];
  filterArea = new BaseFilter();

  constructor(
    private _prs: PumpRigService,
    private _fb: FormBuilder,
    private _as: AreaService,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.PumpRigForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      areaCode : [true, [Validators.required]],
      isActive: [true, [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.getAllArea();
  }

  get f() {
    return this.PumpRigForm.controls;
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
  onCreate() {
    this.submitted = true;
    if (this.PumpRigForm.invalid) {
      return;
    }
    this._prs
      .Insert(
        {
          code: this.PumpRigForm.value.code,
          name: this.PumpRigForm.value.name,
          areaCode : this.PumpRigForm.value.areaCode,
          isActive: this.PumpRigForm.value.isActive,
        },
        false,
      )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          this.PumpRigForm?.get('code')?.setValue('');
          this.PumpRigForm?.get('name')?.setValue('');
          this.PumpRigForm?.get('areaCode')?.setValue('');
          this.PumpRigForm?.get('isActive')?.setValue(true);
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
