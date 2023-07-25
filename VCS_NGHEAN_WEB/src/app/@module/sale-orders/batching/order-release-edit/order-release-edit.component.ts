import {DatePipe} from '@angular/common';
import {Component, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {optionsGroup} from 'src/app/@filter/Common/account-filter.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';
import {AccountGroupService} from 'src/app/services/AD/account-group.service';
import {AccountService} from 'src/app/services/AD/account.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {utils} from 'src/app/utils/utils';
import {formatDate} from '@angular/common';
import {OrderReleaseService} from 'src/app/services/SO/orderRelease.service';
import {VehicleService} from 'src/app/services/MD/vehicle.service';
import {MixerService} from 'src/app/services/MD/mixer.service';
import {EORDER_RELEASE_STEPS} from 'src/app/utils/constant/orderRelease';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-order-release-edit',
  templateUrl: './order-release-edit.component.html',
  styleUrls: ['./order-release-edit.component.scss'],
  providers: [DatePipe],
})
export class OrderReleaseEditComponent {
  orderReleaseForm: FormGroup;
  submitted: boolean = false;
  itemDetail: any;
  filterGroup = new BaseFilter();
  optionsVehicle: any = [];
  optionsMixer: any = [];
  filterVehicle = new BaseFilter();
  filterMixer = new BaseFilter();
  mixDriver: string = '';
  pumpDriver: string = '';
  mixer: any;
  orderDetail: any;
  itemMain: any;
  itemSub: any;

  constructor(
    private _oss: OrderReleaseService,
    private _vs: VehicleService,
    private _ms: MixerService,
    private _fb: FormBuilder,
    private _ags: AccountGroupService,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.orderReleaseForm = this._fb.group({
      code: [''],
      orderCode: ['', [Validators.required]],
      mixNumber: [null, [Validators.required]],
      sealNumber: [''],
      weightIn: [0],
      weightInTime: [null],
      weightOut: [0],
      weightOutTime: [null],
      mixVehicleCode: ['', [Validators.required]],
      mixerCode: ['', [Validators.required]],
      pumpVehicleCode: [''],
      mixDate: [''],
      state: [''],
    });
  }

  get f() {
    return this.orderReleaseForm.controls;
  }

  ngOnInit() {
    this.itemMain = this.orderDetail?.orderDetails?.find((item: any) => item.isMainItem);
    this.orderReleaseForm?.get('code')?.setValue(this.itemDetail?.code);
    this.orderReleaseForm?.get('state')?.setValue(this.itemDetail?.state);
    this.orderReleaseForm?.get('orderCode')?.setValue(this.itemDetail?.orderCode);
    this.orderReleaseForm?.get('mixNumber')?.setValue(this.itemDetail?.mixNumber);
    this.orderReleaseForm?.get('sealNumber')?.setValue(this.itemDetail?.sealNumber);
    this.orderReleaseForm?.get('weightIn')?.setValue(this.itemDetail?.weightIn);
    this.orderReleaseForm?.get('weightInTime')?.setValue(this.itemDetail?.weightInTime);
    this.orderReleaseForm?.get('weightOut')?.setValue(this.itemDetail?.weightOut);
    this.orderReleaseForm?.get('weightOutTime')?.setValue(this.itemDetail?.weightOutTime);
    this.orderReleaseForm?.get('mixVehicleCode')?.setValue(this.itemDetail?.mixVehicleCode);
    this.orderReleaseForm?.get('mixerCode')?.setValue(this.itemDetail?.mixerCode);
    this.orderReleaseForm?.get('pumpVehicleCode')?.setValue(this.itemDetail?.pumpVehicleCode);
    this.orderReleaseForm?.get('mixDate')?.setValue(this.itemDetail?.mixDate);
    this.mixer = this.itemDetail?.mixer;
    this.getAllVehicle();
    this.getMixDriver();
    this.getPumpDriver();
    this.getAllMixer();
  }

  close() {
    this.drawerService.close();
    this.orderReleaseForm?.get('code')?.setValue('');
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

  getMixDriver() {
    const mixVehicleCode = this.orderReleaseForm?.value.mixVehicleCode || '';
    this.getDetailVehicle(mixVehicleCode, 'mixDriver');
  }

  getPumpDriver() {
    const pumpVehicle = this.orderReleaseForm?.value.pumpVehicleCode || '';
    this.getDetailVehicle(pumpVehicle, 'pumpDriver');
  }

  getDetailVehicle(code: any, prop: string) {
    this._vs.GetDetail(code).subscribe(
      (data) => {
        if (prop == 'mixDriver') {
          this[prop] = data.data?.driver || '';
        }
        if (prop == 'pumpDriver') {
          this['pumpDriver'] = data.data?.driver || '';
        }
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  accumulatedNumber() {
    if (!this.orderDetail?.orderReleases) {
      return 0;
    }
    const ordersRelease = this.orderDetail?.orderReleases.map((os: any) => os.mixNumber);
    return (
      ordersRelease.reduce((total: number, currentValue: number) => {
        return total + currentValue;
      }) || 0
    );
  }

  onEdit() {
    this.submitted = true;
    if (this.orderReleaseForm.invalid) {
      return;
    }
    this._oss.Update(this.orderReleaseForm.value).subscribe(
      (data) => {
        this.accumulatedNumber();
        let orderRelease = {...this.orderReleaseForm.value, mixer: this.mixer};
        let orderCode = this.orderDetail.code;
        this.drawerService.returnData({...data, orderRelease, orderCode});
        this.submitted = false;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  isDisableButton() {
    return (
      this.itemDetail?.state == EORDER_RELEASE_STEPS.DA_HOAN_THANH ||
      this.itemDetail?.state == EORDER_RELEASE_STEPS.DA_BI_HUY ||
      this.itemDetail?.state === null
    );
  }

  onFinish() {
    Swal.fire({
      title: 'Bạn muốn xác nhận phiếu hoàn thành?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this._oss.UpdateStep({code: this.itemDetail?.code, state: EORDER_RELEASE_STEPS.DA_HOAN_THANH}, true).subscribe(
          (data) => {
            let orderRelease = {...this.itemDetail, state: EORDER_RELEASE_STEPS.DA_HOAN_THANH};
            let orderCode = this.orderDetail.code;
            this.drawerService.returnData({...data, orderRelease, orderCode});
            this.submitted = false;
          },
          (error) => {
            console.log('error: ', error);
          },
        );
      }
    });
  }

  onCancel() {
    Swal.fire({
      title: 'Bạn muốn xác nhận hủy phiếu?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this._oss.UpdateStep({code: this.itemDetail?.code, state: EORDER_RELEASE_STEPS.DA_BI_HUY}, true).subscribe(
          (data) => {
            let orderRelease = {...this.itemDetail, state: EORDER_RELEASE_STEPS.DA_BI_HUY};
            let orderCode = this.orderDetail.code;
            this.drawerService.returnData({...data, orderRelease, orderCode});
            this.submitted = false;
          },
          (error) => {
            console.log('error: ', error);
          },
        );
      }
    });
  }
}
