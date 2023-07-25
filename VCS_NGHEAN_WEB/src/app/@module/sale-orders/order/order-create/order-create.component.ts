import {Component} from '@angular/core';
import {OrderService} from 'src/app/services/SO/order.service';
import {FormBuilder, FormGroup, Validators, AbstractControl, FormArray} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import * as moment from 'moment';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {ORDER_TYPE_ITEM} from 'src/app/utils/constant/index';
import {STATE_ORDER} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss'],
})
export class OrderCreateComponent {
  STATE_ORDER = STATE_ORDER;
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

  constructor(
    private _service: OrderService,
    private _fb: FormBuilder,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
  ) {
    this.orderForm = this._fb.group({
      partnerCode: ['', [Validators.required]],
      partnerName: ['', [Validators.required]],
      address: [{value: '', disabled: true}],
      phoneNumber: [{value: '', disabled: true}],
      partnerNote: '',
      pourDateTimeArray: this._fb.array([this.createPourDateTimeGroup()]),
      pourLocation: ['', [Validators.required]],
      pourTypeCode: ['', [Validators.required]],
      areaCode: ['', [Validators.required]],
      pourCategory: ['', [Validators.required]],
      orderTypeCode: ['', [Validators.required]],
      itemCodeMain: ['', [Validators.required]],
      itemNameMain: ['', [Validators.required]],
      slump: ['', [Validators.required]],
      unitCodeMain: [{value: '', disabled: true}],
      orderNumberMain: [0, [Validators.min(1), Validators.required]],
      sandCode: ['', [Validators.required]],
      stoneCode: ['', [Validators.required]],
      itemCodeSub: '',
      itemNameSub: '',
      unitCodeSub: [{value: '', disabled: true}],
      orderNumberSub: [{value: 0, disabled: true}],
    });
  }

  get pourDateTimeArray(): FormArray {
    return this.orderForm.get('pourDateTimeArray') as FormArray;
  }

  createPourDateTimeGroup(): FormGroup {
    return this._fb.group({
      pourDate: [moment().format('YYYY-MM-DD'), Validators.required],
      pourTime: [moment().format('HH:mm'), Validators.required],
    });
  }

  addPourDateTime() {
    this.pourDateTimeArray.push(this.createPourDateTimeGroup());
  }

  removePourDateTime(index: number) {
    this.pourDateTimeArray.removeAt(index);
  }

  get pourDates(): FormArray {
    return this.orderForm.get('pourDates') as FormArray;
  }

  get pourTimes(): FormArray {
    return this.orderForm.get('pourTimes') as FormArray;
  }

  getPourTimeControlName(index: number): string {
    return `pourTimes.${index}`;
  }

  getPourTimeControl(index: number): AbstractControl {
    return this.pourTimes.controls[index];
  }

  ngOnInit(): void {
    this.loadInit();
  }

  loadInit() {
    this.GetAllPartner();
    this.GetAllOrderType();
    this.GetAllPourType();
    this.GetAllMainItem();
    this.GetAllSubItem();
    this.GetAllArea();
    this.GetAllSand();
    this.GetAllStone();
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
      this.orderForm.get('unitCodeMain')?.setValue(item?.unit?.name);
    }
  }

  selectItemSub(item: any, event: any) {
    if (event.isUserInput) {
      this.orderForm.get('itemCodeSub')?.setValue(item.code);
      this.orderForm.get('itemNameSub')?.setValue(item.name);
      this.orderForm.get('unitCodeSub')?.setValue(item?.unit?.name || '');
      this.orderForm.controls['orderNumberSub'].enable();
      this.orderForm.controls['orderNumberSub'].setValidators([Validators.min(1), Validators.required]);
      this.orderForm.controls['orderNumberSub'].updateValueAndValidity();
    }
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
    this.drawerService.close();
    this.orderForm?.get('pourDate')?.setValue('');
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

  onCreate() {
    this.handleAutocompleteData();
    this.submitted = true;
    if (this.orderForm.invalid) {
      return;
    }

    const pourDate = this.orderForm.value?.pourDateTimeArray?.map((item: any) => {
      const dateTimeString = `${item.pourDate}T${item.pourTime}:00.000Z`;
      const momentObj = moment(dateTimeString, moment.ISO_8601);
      return momentObj.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    });

    const params = {
      partnerCode: this.orderForm.value.partnerCode,
      partnerNote: this.orderForm.value.partnerNote,
      areaCode: this.orderForm.value.areaCode,
      pourDate: pourDate,
      pourLocation: this.orderForm.value.pourLocation,
      pourCategory: this.orderForm.value.pourCategory,
      pourTypeCode: this.orderForm.value.pourTypeCode,
      orderTypeCode: this.orderForm.value.orderTypeCode,
      pourLatitude: 0,
      pourLongitude: 0,
      state: this.STATE_ORDER['CHUA_XAC_NHAN'].value,
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

    this._service.Insert(params, false).subscribe(
      (data) => {
        this.drawerService.returnData(data);
        this.submitted = false;
        const pourDateTimeArray = this._fb.array([this.createPourDateTimeGroup()]);
        this.orderForm.setControl('pourDateTimeArray', pourDateTimeArray);
        this.orderForm.patchValue({
          partnerName: '',
          partnerCode: '',
          partnerNote: '',
          address: '',
          phoneNumber: '',
          pourLocation: '',
          areaCode: '',
          pourTypeCode: '',
          orderTypeCode: '',
          pourCategory: '',
          itemCodeMain: '',
          itemNameMain: '',
          unitCodeMain: '',
          orderNumberMain: '',
          sandCode: '',
          stoneCode: '',
          slump: '',
          sandName: '',
          stoneName: '',
          itemCodeSub: '',
          itemNameSub: '',
          unitCodeSub: '',
          orderNumberSub: '',
        });
        this.orderForm.controls['orderNumberSub'].disable();
        this.orderForm.controls['orderNumberSub'].clearValidators();
        this.orderForm.controls['orderNumberSub'].updateValueAndValidity();
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
}
