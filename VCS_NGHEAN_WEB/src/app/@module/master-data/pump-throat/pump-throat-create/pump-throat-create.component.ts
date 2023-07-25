import {Component, OnInit} from '@angular/core';
import {PumpThroatService} from 'src/app/services/MD/pump-throat.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsArea, optionsGoods, optionsPumpRig} from 'src/app/@filter/MD/pump-throat-filter.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';
import { GuidEmpty } from 'src/app/utils/constant/constant';
import { AreaService } from 'src/app/services/MD/area.service';
import { GoodsService } from 'src/app/services/MD/goods.service';
import { PumpRigService } from 'src/app/services/MD/pump-rig.service';

@Component({
  selector: 'app-pump-throat-create',
  templateUrl: './pump-throat-create.component.html',
  styleUrls: ['./pump-throat-create.component.scss'],
})
export class PumpThroatCreateComponent implements OnInit{
  PumpThroatForm: FormGroup;
  submitted: boolean = false;

  optionsArea: optionsArea[] = [];
  filterArea = new BaseFilter();

  optionsGoods: optionsGoods[] = [];
  filterGoods = new BaseFilter();

  optionsPumpRig: optionsPumpRig[] = [];
  filterPumpRig = new BaseFilter();

  constructor(
    private _s: PumpThroatService,
    private _as: AreaService,
    private _gs: GoodsService,
    private _prs: PumpRigService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.PumpThroatForm = this._fb.group({
      code: [],
      name: ['', [Validators.required, this.utils.trimSpace]],
      wattage: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
      areaCode: [true, [Validators.required]],
      goodsCode: [true, [Validators.required]],
      pumpRigCode: [true, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllArea();
    this.getAllGoods();
    this.getAllPumpRig();
  }

  //Chọn khu vực
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
  onChangeArea(e: any) {
    this.filterArea.keyWord = e;
    this.getAllArea();

  }
  onSelectItemArea(item: any) {
    this.PumpThroatForm?.get('areaCode')?.setValue(item.code);
    this._prs.search(this.filterPumpRig).subscribe({
      next: ({data}) => {
        this.optionsPumpRig = data.data.filter((x: { areaCode: any; }) => x.areaCode == item.code);
        this.PumpThroatForm?.get('pumpRigCode')?.reset();
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  //Chọn loại hàng
  getAllGoods() {
    this.filterGoods.pageSize = 100;
    this._gs.search(this.filterGoods).subscribe({
      next: ({data}) => {
        this.optionsGoods = data.data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
  onChangeGoods(e: any) {
    this.filterGoods.keyWord = e;
    this.getAllGoods();
  }
  onSelectItemGoods(item: any) {
    this.PumpThroatForm?.get('goodsCode')?.setValue(item.code);
  }

  //Chọn giàn bơm
  getAllPumpRig() {
    this.filterPumpRig.pageSize = 100;
    this._prs.search(this.filterPumpRig).subscribe({
      next: ({data}) => {
        this.optionsPumpRig = data.data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
  onChangePumpRig(e: any) {
    this.filterPumpRig.keyWord = e;
    this.getAllPumpRig();
  }
  onSelectItemPumpRig(item: any) {
    this.PumpThroatForm?.get('pumpRigCode')?.setValue(item.code);
  }

  get f() {
    return this.PumpThroatForm.controls;
  }

  close() {
    this.drawerService.close();
    this.PumpThroatForm?.get('code')?.setValue('');
    this.PumpThroatForm?.get('name')?.setValue('');
    this.PumpThroatForm?.get('areaCode')?.setValue('');
    this.PumpThroatForm?.get('goodsCode')?.setValue('');
    this.PumpThroatForm?.get('pumpRigCode')?.setValue('');
    this.PumpThroatForm?.get('wattage')?.setValue('');
    this.PumpThroatForm?.get('isActive')?.setValue(true);
  }

  onCreate() {
    debugger
    this.submitted = true;
    if (this.PumpThroatForm.invalid) {
      return;
    }
    this._s.Insert(
        {
          code: this.PumpThroatForm.value.code,
          name: this.PumpThroatForm.value.name,
          areaCode: this.PumpThroatForm.value.areaCode,
          pumpRigCode: this.PumpThroatForm.value.pumpRigCode,
          isActive: this.PumpThroatForm.value.isActive,
          goodsCode: this.PumpThroatForm.value.goodsCode,
          wattage: this.PumpThroatForm.value.wattage,
        },
        false,
      )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          this.PumpThroatForm?.get('code')?.setValue('');
          this.PumpThroatForm?.get('name')?.setValue('');
          this.PumpThroatForm?.get('areaCode')?.setValue('');
          this.PumpThroatForm?.get('goodsCode')?.setValue('');
          this.PumpThroatForm?.get('pumpRigCode')?.setValue('');
          this.PumpThroatForm?.get('wattage')?.setValue('');
          this.PumpThroatForm?.get('isActive')?.setValue(true);
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
