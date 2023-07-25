import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {optionsGroup} from 'src/app/@filter/Common/account-filter.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';
import {AccountGroupService} from 'src/app/services/AD/account-group.service';
import {AccountService} from 'src/app/services/AD/account.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {MixerService} from 'src/app/services/MD/mixer.service';
import {VehicleService} from 'src/app/services/MD/vehicle.service';
import {OrderReleaseService} from 'src/app/services/SO/orderRelease.service';
import {utils} from 'src/app/utils/utils';
@Component({
  selector: 'app-order-release-create',
  templateUrl: './order-release-create.component.html',
  styleUrls: ['./order-release-create.component.scss'],
})
export class OrderReleaseCreateComponent {
  orderReleaseForm: FormGroup;
  submitted: boolean = false;
  itemDetail: any;
  filterGroup = new BaseFilter();
  optionsGroup: optionsGroup[] = [];
  orderCode: string = '';
  filterVehicle = new BaseFilter();
  optionsVehicle: any = [];
  mixDriver: string = '';
  pumpDriver: string = '';
  orderDetail: any;
  optionsMixer: any = [];
  filterMixer = new BaseFilter();
  itemMain: any;
  mixer: any;

  constructor(
    private _oss: OrderReleaseService,
    private _fb: FormBuilder,
    private _ms: MixerService,
    private _ags: AccountGroupService,
    private utils: utils,
    private _vs: VehicleService,
    private drawerService: DrawerService,
  ) {
    this.orderReleaseForm = this._fb.group({
      orderCode: ['', Validators.required],
      mixNumber: [null, [Validators.required]],
      sealNumber: [''],
      weightIn: [0],
      weightInTime: [null],
      weightOut: [0],
      weightOutTime: [null],
      mixVehicleCode: ['', [Validators.required]],
      mixerCode: ['', [Validators.required]],
      pumpVehicleCode: [''],
      mixDate: [null],
    });
  }

  get f() {
    return this.orderReleaseForm.controls;
  }

  ngOnInit() {
    this.orderReleaseForm?.get('orderCode')?.setValue(this.orderCode);
    this.getAllVehicle();
    this.getAllMixer();
    this.itemMain = this.orderDetail?.orderDetails?.find((item: any) => item.isMainItem);
  }

  close() {
    this.drawerService.close();
    this.orderReleaseForm?.get('orderCode')?.setValue('');
    this.orderReleaseForm?.get('mixNumber')?.setValue(0);
    this.orderReleaseForm?.get('sealNumber')?.setValue('');
    this.orderReleaseForm?.get('weightIn')?.setValue(0);
    this.orderReleaseForm?.get('weightInTime')?.setValue(null);
    this.orderReleaseForm?.get('weightOut')?.setValue(0);
    this.orderReleaseForm?.get('weightOutTime')?.setValue(null);
    this.orderReleaseForm?.get('mixVehicleCode')?.setValue('');
    this.orderReleaseForm?.get('mixerCode')?.setValue('');
    this.orderReleaseForm?.get('pumpVehicleCode')?.setValue('');
    this.orderReleaseForm?.get('mixDate')?.setValue(null);
  }
  getAllVehicle() {
    this._vs.search(this.filterVehicle).subscribe(
      (res) => {
        this.optionsVehicle = res.data.data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  getAllMixer() {
    this._ms.search(this.filterMixer).subscribe(
      (res) => {
        this.optionsMixer = res.data.data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  onSelectItem(item: any) {
    this.orderReleaseForm?.get('mixVehicleCode')?.setValue(item.code);
    this.mixDriver = item.driver;
  }

  onChange(e: any) {
    this.filterVehicle.keyWord = e;
    this.getAllVehicle();
  }

  onChangePump(e: any) {
    this.filterVehicle.keyWord = e;
    this.getAllVehicle();
  }

  onSelectPump(item: any) {
    this.orderReleaseForm?.get('pumpVehicleCode')?.setValue(item.code);
    this.pumpDriver = item.driver;
  }

  onChangeMix(e: any) {
    this.filterMixer.keyWord = e;
    this.getAllMixer();
  }

  onSelectMix(item: any) {
    this.orderReleaseForm?.get('mixerCode')?.setValue(item.code);
    this.mixer = item;
  }

  accumulatedNumber() {
    if (this.orderDetail?.orderReleases.length <= 0) {
      return 0;
    }
    const ordersRelease = this.orderDetail?.orderReleases.map((os: any) => os.mixNumber);
    return (
      ordersRelease.reduce((total: number, currentValue: number) => {
        return total + currentValue;
      }) || 0
    );
  }
  onCreate() {
    this.submitted = true;
    if (this.orderReleaseForm.invalid) {
      return;
    }
    this._oss.Insert(this.orderReleaseForm.value).subscribe(
      (data) => {
        const result = {...data.data, mixer: this.mixer};
        this.drawerService.returnData({...data, data: result});
        this.submitted = false;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
}
