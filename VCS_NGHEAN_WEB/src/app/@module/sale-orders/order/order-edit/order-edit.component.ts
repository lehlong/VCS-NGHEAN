import {Component, HostListener, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {OrderService} from 'src/app/services/SO/order.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import * as moment from 'moment';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {ORDER_TYPE_ITEM, STATE_ORDER, ACTION_ORDER} from 'src/app/utils/constant/index';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {OrderReleaseCreateComponent} from '../../batching/order-release-create/order-release-create.component';
import {OrderFilter} from 'src/app/@filter/SO/order-filter.model';
import {utils} from 'src/app/utils/utils';
@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss'],
})
export class OrderEditComponent {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = `${window.innerWidth * 0.65}px`;
  }
  screenWidth: string = '0px';
  stateDetail: string = '';
  STATE_ORDER = STATE_ORDER;
  ACTION_ORDER = ACTION_ORDER;
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
  listMixerAll: any = [];
  widthTab2: string = '0px';
  listPartnerFilter: any = [];
  listItemFilterMain: any = [];
  listItemFilterSub: any = [];

  openEdit: boolean = false;
  code: string = '';
  filter = new OrderFilter();
  showButton = {
    confirm: false,
    cancel: false,
    complete: false,
    save: false,
    edit: true,
  };
  detailData: any = {};
  title = 'Thông tin đơn hàng';

  constructor(
    private _service: OrderService,
    private _fb: FormBuilder,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private utils: utils,
    private route: ActivatedRoute,
  ) {
    this.screenWidth = `${window.innerWidth * 0.65}px`;
    this.orderForm = this._fb.group({
      partnerCode: ['', [Validators.required]],
      partnerName: ['', [Validators.required]],
      address: [{value: '', disabled: true}],
      phoneNumber: [{value: '', disabled: true}],
      partnerNote: '',
      pourTypeCode: ['', [Validators.required]],
      pourTypeName: '',
      pourDate: ['', [Validators.required]],
      pourTime: ['', [Validators.required]],
      pourLocation: ['', [Validators.required]],
      areaCode: ['', [Validators.required]],
      mixerCode: '',
      mixerName: '',
      pourCategory: ['', [Validators.required]],
      orderTypeCode: ['', [Validators.required]],
      orderTypeName: '',
      itemCodeMain: ['', [Validators.required]],
      itemNameMain: ['', [Validators.required]],
      slump: ['', [Validators.required]],
      unitCodeMain: [{value: '', disabled: true}],
      orderNumberMain: [0, [Validators.min(1), Validators.required]],
      sandCode: ['', [Validators.required]],
      stoneCode: ['', [Validators.required]],
      sandName: '',
      stoneName: '',
      itemCodeSub: '',
      itemNameSub: '',
      unitCodeSub: [{value: '', disabled: true}],
      orderNumberSub: [{value: 0, disabled: true}],
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  showEdit(show: boolean) {
    this.title = show ? 'Chỉnh sửa đơn hàng' : 'Thông tin đơn hàng';
    this.openEdit = show;
  }

  ngOnInit(): void {
    this.loadInit();
  }

  loadInit() {
    this.GetAllMixer();
    this.GetAllPartner();
    this.GetAllOrderType();
    this.GetAllPourType();
    this.GetAllMainItem();
    this.GetAllSubItem();
    this.GetAllArea();
    this.GetAllSand();
    this.GetAllStone();
    this.GetDetail();
  }

  onChangePartner(event: any) {
    this.listPartnerFilter = this.listPartnerAll.filter((item: any) => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }

  onChangeItemMain(event: any) {
    this.listItemFilterMain = this.listItemAllMain.filter((item: any) => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }

  onChangeItemSub(event: any) {
    if (event?.target?.value == '') {
      this.orderForm.controls['orderNumberSub'].clearValidators();
      this.orderForm.controls['orderNumberSub'].updateValueAndValidity();
    }
    this.listItemFilterSub = this.listItemAllSub.filter((item: any) => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }

  selectPartner(item: any, event: any) {
    if (event.isUserInput) {
      this.orderForm.get('partnerCode')?.setValue(item.code);
      this.orderForm.get('address')?.setValue(item.address);
      this.orderForm.get('phoneNumber')?.setValue(item.phoneNumber);
    }
  }

  selectItemMain(item: any, event: any) {
    if (event.isUserInput) {
      this.orderForm.get('itemCodeMain')?.setValue(item.code);
      this.orderForm.get('unitCodeMain')?.setValue(item?.unit?.name || '');
    }
  }

  selectItemSub(item: any, event: any) {
    if (event.isUserInput) {
      this.orderForm.get('itemCodeSub')?.setValue(item.code);
      this.orderForm.get('itemNameSub')?.setValue(item.name);
      this.orderForm.get('unitCodeSub')?.setValue(item?.unit?.name || '');
      this.orderForm.controls['orderNumberSub'].setValidators([Validators.min(1), Validators.required]);
      this.orderForm.controls['orderNumberSub'].enable();
      this.orderForm.controls['orderNumberSub'].updateValueAndValidity();
    }
  }

  GetDetail() {
    this._service
      .GetDetail({
        code: this.code,
      })
      .subscribe(
        ({data}) => {
          const itemMain = data?.orderDetails?.find((item: any) => item.isMainItem);
          const itemSub = data?.orderDetails?.find((item: any) => !item.isMainItem);
          this.stateDetail = data?.state;
          this.showButton = {
            confirm: this.stateDetail === this.STATE_ORDER['CHUA_XAC_NHAN'].value,
            cancel:
              this.stateDetail == STATE_ORDER['CHUA_XAC_NHAN'].value ||
              this.stateDetail == STATE_ORDER['DA_XAC_NHAN'].value,
            complete:
              this.stateDetail == STATE_ORDER['DA_XAC_NHAN'].value ||
              this.stateDetail == STATE_ORDER['DANG_LAY_HANG'].value,
            save:
              this.stateDetail != STATE_ORDER['DA_BI_HUY'].value &&
              this.stateDetail != STATE_ORDER['DA_HOAN_THANH'].value,
            edit:
              this.stateDetail != STATE_ORDER['DA_BI_HUY'].value &&
              this.stateDetail != STATE_ORDER['DA_HOAN_THANH'].value,
          };
          if (itemSub?.orderNumber && itemSub?.orderNumber != 0 && itemSub?.orderNumber != '') {
            this.orderForm.controls['orderNumberSub'].enable();
          }
          this.detailData = data;
          this.orderForm.patchValue({
            partnerCode: data?.partner?.code || '',
            partnerName: data?.partner?.name || '',
            address: data?.partner?.name || '',
            phoneNumber: data?.partner?.phoneNumber || '',
            partnerNote: data?.partnerNote || '',
            pourDate: data?.pourDate ? moment(data.pourDate).format('YYYY-MM-DD') : null,
            pourTime: data?.pourDate ? moment(data.pourDate).format('HH:mm') : null,
            pourLocation: data?.pourLocation || '',
            mixerCode: data?.mixerCode || data?.mixer?.code || '',
            mixerName: data?.mixer?.name || '',
            areaCode: data?.areaCode || '',
            pourCategory: data?.pourCategory || '',
            pourTypeCode: data?.pourTypeCode || '',
            pourTypeName: data?.pourType?.name || '',
            orderTypeCode: data?.orderTypeCode || '',
            orderTypeName: data?.orderType?.name || '',
            itemCodeMain: itemMain?.item?.code || itemMain?.itemCode || '',
            itemNameMain: itemMain?.item?.name || '',
            slump: itemMain?.slump || '',
            unitCodeMain: itemMain?.item?.unit?.name || '',
            orderNumberMain: this.utils.formatNumber(itemMain?.orderNumber) || 0,
            sandCode: itemMain?.sandCode || '',
            stoneCode: itemMain?.stoneCode || '',
            sandName: itemMain?.sand?.name || '',
            stoneName: itemMain?.stone?.name || '',
            itemCodeSub: itemSub?.item?.code || '',
            itemNameSub: itemSub?.item?.name || '',
            unitCodeSub: itemSub?.item?.unit?.name || '',
            orderNumberSub: this.utils.formatNumber(itemSub?.orderNumber) || 0,
          });
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }

  GetAllPartner() {
    this.dropdownService.GetAllPartner().subscribe(
      ({data}) => {
        this.listPartnerAll = data;
        this.listPartnerFilter = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllMixer() {
    this.dropdownService.GetAllMixer().subscribe(
      ({data}) => {
        this.listMixerAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllOrderType() {
    this.dropdownService.GetAllOrderType().subscribe(
      ({data}) => {
        this.listOrderTypeAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllPourType() {
    this.dropdownService.GetAllPourType().subscribe(
      ({data}) => {
        this.listPourTypeAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllMainItem() {
    this.dropdownService.GetAllItem({TypeCode: ORDER_TYPE_ITEM.be_tong}).subscribe(
      ({data}) => {
        this.listItemAllMain = data;
        this.listItemFilterMain = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllSubItem() {
    this.dropdownService.GetAllItem({TypeCode: ORDER_TYPE_ITEM.xebom}).subscribe(
      ({data}) => {
        this.listItemAllSub = data;
        this.listItemFilterSub = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllSand() {
    this.dropdownService.GetAllItem({TypeCode: ORDER_TYPE_ITEM.sand}).subscribe(
      ({data}) => {
        this.listSandAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllStone() {
    this.dropdownService.GetAllItem({TypeCode: ORDER_TYPE_ITEM.stone}).subscribe(
      ({data}) => {
        this.listStoneAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllArea() {
    this.dropdownService.GetAllArea().subscribe(
      ({data}) => {
        this.listAreaAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  get f() {
    return this.orderForm.controls;
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
  }

  handleAutocompleteData() {
    const partnerCode = this.listPartnerAll.find((item: any) => item.code == this.orderForm.value.partnerCode);
    if (!partnerCode || partnerCode?.name !== this.orderForm.value.partnerName) {
      this.orderForm.get('partnerCode')?.setValue('');
      this.orderForm.get('partnerName')?.setValue('');
      this.listPartnerFilter = this.listPartnerAll;
    }

    const itemCodeMain = this.listItemAllMain.find((item: any) => item.code == this.orderForm.value.itemCodeMain);
    if (!itemCodeMain || itemCodeMain?.name !== this.orderForm.value.itemNameMain) {
      this.orderForm.get('itemCodeMain')?.setValue('');
      this.orderForm.get('itemNameMain')?.setValue('');
      this.listItemFilterMain = this.listItemAllMain;
    }

    const itemCodeSub = this.listItemAllSub.find((item: any) => item.code == this.orderForm.value.itemCodeSub);

    if (!itemCodeSub || itemCodeSub?.name !== this.orderForm.value.itemNameSub) {
      this.orderForm.get('itemCodeSub')?.setValue('');
      this.orderForm.get('itemNameSub')?.setValue('');
      this.orderForm.get('orderNumberSub')?.setValue(0);
      this.orderForm.controls['orderNumberSub'].disable();
      this.orderForm.controls['orderNumberSub'].clearValidators();
      this.orderForm.controls['orderNumberSub'].updateValueAndValidity();
      this.listItemFilterSub = this.listItemAllSub;
    }
  }

  onEdit() {
    this.handleAutocompleteData();
    this.submitted = true;
    if (this.orderForm.invalid) {
      return;
    }
    const dateTimeString = `${this.orderForm.value.pourDate}T${this.orderForm.value.pourTime}:00.000Z`;
    const momentObj = moment(dateTimeString, moment.ISO_8601);

    const params = {
      code: this.code,
      partnerCode: this.orderForm.value.partnerCode,
      partnerNote: this.orderForm.value.partnerNote,
      areaCode: this.orderForm.value.areaCode,
      pourDate: momentObj.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      pourLocation: this.orderForm.value.pourLocation,
      pourCategory: this.orderForm.value.pourCategory,
      pourTypeCode: this.orderForm.value.pourTypeCode,
      orderTypeCode: this.orderForm.value.orderTypeCode,
      pourLatitude: 0,
      pourLongitude: 0,
      state: this.stateDetail,
      mixerCode: this.orderForm.value.mixerCode !== '' ? this.orderForm.value.mixerCode : null,
      orderDetails: [
        {
          itemCode: this.orderForm.value.itemCodeMain,
          isMainItem: true,
          orderNumber: parseFloat(this.orderForm.value.orderNumberMain.replace(/,/g, '')),
          sandCode: this.orderForm.value.sandCode,
          stoneCode: this.orderForm.value.stoneCode,
          slump: this.orderForm.value.slump,
        },
        {
          itemCode: this.orderForm.value.itemCodeSub,
          isMainItem: false,
          orderNumber:
            this.orderForm.value.orderNumberSub && this.orderForm.value.orderNumberSub != ''
              ? parseFloat(this.orderForm.value.orderNumberSub.replace(/,/g, ''))
              : 0,
        },
      ],
    };

    this._service.Update(params, false).subscribe(
      (data) => {
        this.drawerService.returnData(data);
        this.submitted = false;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  ConfirmState() {
    this.submitted = true;
    if (this.orderForm.invalid) {
      return;
    }

    Swal.fire({
      title: 'Xác nhận đơn hàng ?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Huỷ',
    }).then((result) => {
      if (result.isConfirmed) {
        const dateTimeString = `${this.orderForm.value.pourDate}T${this.orderForm.value.pourTime}:00.000Z`;
        const momentObj = moment(dateTimeString, moment.ISO_8601);
        const params = {
          code: this.code,
          partnerCode: this.orderForm.value.partnerCode,
          partnerNote: this.orderForm.value.partnerNote,
          areaCode: this.orderForm.value.areaCode,
          pourDate: momentObj.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
          pourLocation: this.orderForm.value.pourLocation,
          pourCategory: this.orderForm.value.pourCategory,
          pourTypeCode: this.orderForm.value.pourTypeCode,
          orderTypeCode: this.orderForm.value.orderTypeCode,
          pourLatitude: 0,
          pourLongitude: 0,
          state: this.STATE_ORDER['DA_XAC_NHAN'].value,
          mixerCode: this.orderForm.value.mixerCode !== '' ? this.orderForm.value.mixerCode : null,
          orderDetails: [
            {
              itemCode: this.orderForm.value.itemCodeMain,
              isMainItem: true,
              orderNumber: parseFloat(this.orderForm.value.orderNumberMain.replace(/,/g, '')),
              sandCode: this.orderForm.value.sandCode,
              stoneCode: this.orderForm.value.stoneCode,
              slump: this.orderForm.value.slump,
            },
            {
              itemCode: this.orderForm.value.itemCodeSub,
              isMainItem: false,
              orderNumber:
                this.orderForm.value.orderNumberSub && this.orderForm.value.orderNumberSub != ''
                  ? parseFloat(this.orderForm.value.orderNumberSub.replace(/,/g, ''))
                  : 0,
            },
          ],
        };
        this._service.Update(params, false).subscribe(
          (data) => {
            this.drawerService.returnData(data);
            this.submitted = false;
            this.stateDetail = this.STATE_ORDER['DA_XAC_NHAN'].value;
            this.showButton = {
              confirm: false,
              cancel: true,
              complete: true,
              save: true,
              edit: true,
            };
          },
          (error) => {
            console.log('error: ', error);
          },
        );
      }
    });
  }

  CancelState() {
    Swal.fire({
      title: 'Huỷ đơn hàng ?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Huỷ đơn',
      cancelButtonText: 'Huỷ',
    }).then((result) => {
      if (result.isConfirmed) {
        this._service
          .CancelState(
            {
              code: this.code,
            },
            false,
          )
          .subscribe(
            (data) => {
              this.drawerService.returnData(data);
              this.submitted = false;
              this.stateDetail = this.STATE_ORDER['DA_BI_HUY'].value;
              this.title = 'Thông tin đơn hàng';
              this.showButton = {
                confirm: false,
                cancel: false,
                complete: false,
                save: false,
                edit: false,
              };
            },
            (error) => {
              console.log('error: ', error);
            },
          );
      }
    });
  }

  CompleteState() {
    Swal.fire({
      title: 'Hoàn thành đơn hàng ?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hoàn thành',
      cancelButtonText: 'Huỷ',
    }).then((result) => {
      if (result.isConfirmed) {
        this._service
          .CompleteState(
            {
              code: this.code,
            },
            false,
          )
          .subscribe(
            (data) => {
              this.drawerService.returnData(data);
              this.submitted = false;
              this.stateDetail = this.STATE_ORDER['DA_HOAN_THANH'].value;
              this.title = 'Thông tin đơn hàng';
              this.showButton = {
                confirm: false,
                cancel: false,
                complete: false,
                save: false,
                edit: false,
              };
            },
            (error) => {
              console.log('error: ', error);
            },
          );
      }
    });
  }

  onCreateOrderRelease() {
    this.drawerService.open(OrderReleaseCreateComponent, {orderCode: this.code}).subscribe((data) => {
      this.drawerService.close();
    });
  }
}
