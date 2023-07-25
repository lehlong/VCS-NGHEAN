import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {OrderService} from 'src/app/services/SO/order.service';
import {ACTION_ORDER, ORDER_TYPE_ITEM, STATE_ORDER} from 'src/app/utils/constant';
import Swal from 'sweetalert2';
import {OrderReleaseCreateComponent} from '../order-release-create/order-release-create.component';
import {utils} from 'src/app/utils/utils';
import {OrderReleaseEditComponent} from '../order-release-edit/order-release-edit.component';
import {LIST_ORDER_RELEASE} from 'src/app/utils/constant/orderRelease';

@Component({
  selector: 'app-order-release-detail',
  templateUrl: './order-release-detail.component.html',
  styleUrls: ['./order-release-detail.component.scss'],
})
export class OrderReleaseDetailComponent implements OnInit {
  stateDetail: string = '';
  STATE_ORDER = STATE_ORDER;
  ACTION_ORDER = ACTION_ORDER;
  state_orderRelease = LIST_ORDER_RELEASE;
  orderForm: FormGroup;
  submitted: boolean = false;
  displayDate: string | null = 'Ngày đổ';
  listPartnerAll: any = [];
  listPourTypeAll: any = [];
  listOrderTypeAll: any = [];
  listItemAllMain: any = [];
  listItemAllSub: any = [];
  listAreaAll: any = [];
  listSandAll: any = [];
  listStoneAll: any = [];

  listPartnerFilter: any = [];
  listItemFilterMain: any = [];
  listItemFilterSub: any = [];

  currentTab: number = 1;
  code: string = '';

  isFromOrderRelease: boolean = false;
  ordersDetail: any = [];
  orderReleases: any = [];
  dataDetail: any;
  itemMain: any;
  itemSub: any;

  constructor(
    private _service: OrderService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.orderForm = this._fb.group({
      partnerCode: ['', [Validators.required]],
      partnerName: ['', [Validators.required]],
      address: [''],
      phoneNumber: [''],
      partnerNote: '',
      pourDate: ['', [Validators.required]],
      pourTime: ['', [Validators.required]],
      pourLocation: ['', [Validators.required]],
      areaCode: '',
      pourCategory: '',
      orderTypeCode: ['', [Validators.required]],
      itemCodeMain: ['', [Validators.required]],
      itemNameMain: ['', [Validators.required]],
      slump: ['', [Validators.required]],
      unitCodeMain: [''],
      orderNumberMain: [0, [Validators.required]],
      sandCode: ['', [Validators.required]],
      stoneCode: ['', [Validators.required]],
      itemCodeSub: '',
      itemNameSub: '',
      unitCodeSub: [''],
      orderNumberSub: 0,
    });
  }

  ngOnInit(): void {
    this.loadInit();
  }

  loadInit() {
    this.GetDetail();
  }

  GetDetail() {
    this._service
      .GetDetail(
        {
          code: this.code,
        },
        true,
      )
      .subscribe(
        ({data}) => {
          this.dataDetail = data;
          this.itemMain = data?.orderDetails?.find((item: any) => item.isMainItem);
          this.itemSub = data?.orderDetails?.find((item: any) => !item.isMainItem);
          this.stateDetail = data?.state;
          this.ordersDetail = data?.orderDetails;
          this.orderReleases = data?.orderReleases;
          this.orderForm.patchValue({
            partnerCode: data?.partner?.code || '',
            partnerName: data?.partner?.name || '',
            address: data?.partner?.name || '',
            phoneNumber: data?.partner?.phoneNumber || '',
            partnerNote: data?.partnerNote || '',
            pourDate: data?.pourDate ? moment(data.pourDate).format('YYYY-MM-DD') : null,
            pourTime: data?.pourDate ? moment(data.pourDate).format('HH:mm') : null,
            pourLocation: data?.pourLocation || '',
            areaCode: data?.areaCode || '',
            pourCategory: data?.pourCategory || '',
            orderTypeCode: data?.orderTypeCode || '',
            // itemCodeMain: itemMain?.item?.code || itemMain?.itemCode || '',
            // itemNameMain: itemMain?.item?.name || '',
            // slump: itemMain?.slump || '',
            // unitCodeMain: itemMain?.item?.unit?.name || '',
            // orderNumberMain: itemMain?.orderNumber || 0,
            // sandCode: itemMain?.sandCode || '',
            // stoneCode: itemMain?.stoneCode || '',
            // itemCodeSub: itemSub?.item?.code || '',
            // itemNameSub: itemSub?.item?.name || '',
            // unitCodeSub: itemSub?.item?.unit?.name || '',
            // orderNumberSub: itemSub?.orderNumber || 0,
          });
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }

  close() {
    this.drawerService.close();
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: {}});
    this.drawerService.close();
  }

  changeTab(tab: number) {
    this.currentTab = tab;
    this.drawerService.returnData({
      type: 'tab',
      tab: tab,
    });
  }

  isDisableButton() {
    return (
      this.dataDetail?.state == STATE_ORDER['DA_HOAN_THANH'].value ||
      this.dataDetail?.state == STATE_ORDER['DA_BI_HUY'].value ||
      this.dataDetail?.state == STATE_ORDER['DA_TU_CHOI'].value ||
      this.dataDetail?.state === null
    );
  }

  openEdit(item: any) {
    this.drawerService
      .open(OrderReleaseEditComponent, {
        itemDetail: item,
        orderDetail: this.dataDetail,
      })
      .subscribe((result) => {
        if (result?.status) {
          this.loadInit();
        }
      });
  }

  onCreateOrderRelease() {
    this.drawerService
      .open(OrderReleaseCreateComponent, {orderCode: this.code, orderDetail: this.dataDetail})
      .subscribe((data) => {
        this.drawerService.close();
      });
  }
}
