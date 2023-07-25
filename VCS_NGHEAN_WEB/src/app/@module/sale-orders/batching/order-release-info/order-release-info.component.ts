import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';
import {AccountGroupService} from 'src/app/services/AD/account-group.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {MixerService} from 'src/app/services/MD/mixer.service';
import {VehicleService} from 'src/app/services/MD/vehicle.service';
import {OrderReleaseService} from 'src/app/services/SO/orderRelease.service';
import {EORDER_RELEASE_STEPS, LIST_ORDER_RELEASE} from 'src/app/utils/constant/orderRelease';
import {utils} from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import {OrderReleaseEditComponent} from '../order-release-edit/order-release-edit.component';

@Component({
  selector: 'app-order-release-info',
  templateUrl: './order-release-info.component.html',
  styleUrls: ['./order-release-info.component.scss'],
})
export class OrderReleaseInfoComponent {
  orderCode: string = '';
  itemDetail: any;
  orderDetail: any;
  itemMain: any;
  itemSub: any;
  state_orderRelease = LIST_ORDER_RELEASE;

  constructor(
    private _ors: OrderReleaseService,
    private _vs: VehicleService,
    private _ms: MixerService,
    private _fb: FormBuilder,
    private _ags: AccountGroupService,
    private utils: utils,
    private drawerService: DrawerService,
  ) {}

  ngOnInit() {
    this.getDetail();
    this.itemMain = this.orderDetail?.orderDetails?.find((item: any) => item.isMainItem);
    this.itemSub = this.orderDetail?.orderDetails?.find((item: any) => !item.isMainItem);
  }

  getDetail() {
    this._ors.GetDetail(this.orderCode).subscribe(
      ({data}) => {
        console.log(data, 'data');
        this.itemDetail = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  close() {
    this.drawerService.close();
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

  isDisableButton() {
    return (
      this.itemDetail?.state == EORDER_RELEASE_STEPS.DA_HOAN_THANH ||
      this.itemDetail?.state == EORDER_RELEASE_STEPS.DA_BI_HUY ||
      this.itemDetail?.state === null
    );
  }

  openEditOR() {
    this.drawerService
      .open(OrderReleaseEditComponent, {
        itemDetail: this.itemDetail,
        orderDetail: this.orderDetail,
      })
      .subscribe((result) => {
        this.getDetail();
      });
  }
}
