import {Component, HostListener} from '@angular/core';
import {DebtService} from 'src/app/services/SO/debt.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import * as moment from 'moment';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {ORDER_TYPE_ITEM, STATE_DEBT, ACTION_DEBT} from 'src/app/utils/constant/index';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {DebtFilter} from 'src/app/@filter/SO/debt-filter.model';
import {utils} from 'src/app/utils/utils';
@Component({
  selector: 'app-debt-edit',
  templateUrl: './debt-edit.component.html',
  styleUrls: ['./debt-edit.component.scss'],
})
export class DebtEditComponent {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = `${window.innerWidth * 0.65}px`;
  }
  screenWidth: string = '0px';
  STATE_DEBT = STATE_DEBT;
  ACTION_DEBT = ACTION_DEBT;
  debtForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  filter = new DebtFilter();
  detailData: any = {};
  title = 'Chỉnh sửa đơn hàng';
  intoMoneyMain: string = '';
  intoMoneySub: string = '';
  intoMoneyTotal: string = '';
  stateDetail:string = '';

  constructor(
    private _service: DebtService,
    private _fb: FormBuilder,
    private drawerService: DrawerService,
    private router: Router,
    private utils: utils,
    private route: ActivatedRoute,
  ) {
    this.screenWidth = `${window.innerWidth * 0.65}px`;
    this.debtForm = this._fb.group({
      unitPriceMain: ['', [Validators.required]],
      unitPriceSub: ['', [Validators.required]],
      disCount: ['', [Validators.required]],
      taxVAT: ['', [Validators.required]],
      payMoney: ['', [Validators.required]],
      totalMoney: [{value: '', disabled: true}],
      debt: [{value: '', disabled: true}],
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  ngOnInit(): void {
    this.loadInit();
  }

  loadInit() {
    this.GetDetail();
  }

  enterUnitPriceMain(e: any) {
    try {
      if (e.target.value == '') {
        this.intoMoneyMain = '';
      } else {
        if (
          !this.detailData?.orderDetails?.[0]?.releaseNumber ||
          this.detailData?.orderDetails?.[0]?.releaseNumber == ''
        ) {
          this.intoMoneyMain = '0';
        } else {
          const releaseNumber: number =
            typeof this.detailData?.orderDetails?.[0]?.releaseNumber == 'number'
              ? this.detailData?.orderDetails?.[0]?.releaseNumber
              : parseFloat(this.detailData?.orderDetails?.[0]?.releaseNumber);
          const intoMoneyMainNumber: number = parseFloat(e.target.value.replace(/,/g, '')) * releaseNumber;
          this.intoMoneyMain = intoMoneyMainNumber.toString();
        }
      }
      const intoMoneyMain = this.intoMoneyMain == '' ? 0 : parseFloat(this.intoMoneyMain);
      const intoMoneySub = this.intoMoneySub == '' ? 0 : parseFloat(this.intoMoneySub);
      this.intoMoneyTotal =
        this.intoMoneyMain == '' && this.intoMoneySub == '' ? '' : `${intoMoneyMain + intoMoneySub}`;
    } catch (e) {
      console.log(e);
    }
  }

  enterUnitPriceSub(e: any) {
    try {
      if (e.target.value == '') {
        this.intoMoneySub = '';
      } else {
        if (
          !this.detailData?.orderDetails?.[1]?.releaseNumber ||
          this.detailData?.orderDetails?.[1]?.releaseNumber == ''
        ) {
          this.intoMoneySub = '0';
        } else {
          const releaseNumber: number =
            typeof this.detailData?.orderDetails?.[1]?.releaseNumber == 'number'
              ? this.detailData?.orderDetails?.[1]?.releaseNumber
              : parseFloat(this.detailData?.orderDetails?.[1]?.releaseNumber);
          const intoMoneySubNumber: number = parseFloat(e.target.value.replace(/,/g, '')) * releaseNumber;
          this.intoMoneySub = intoMoneySubNumber.toString();
        }
      }
      const intoMoneyMain = this.intoMoneyMain == '' ? 0 : parseFloat(this.intoMoneyMain);
      const intoMoneySub = this.intoMoneySub == '' ? 0 : parseFloat(this.intoMoneySub);
      this.intoMoneyTotal =
        this.intoMoneyMain == '' && this.intoMoneySub == '' ? '' : `${intoMoneyMain + intoMoneySub}`;
    } catch (e) {
      console.log(e);
    }
  }

  enterDisCount(e: any) {
    try {
      const disCount: number = e.target.value == '' ? 0 : parseFloat(e.target.value.replace(/,/g, ''));
      const taxVAT: number =
        this.debtForm.get('taxVAT')?.value == '' ? 0 : parseFloat(this.debtForm.get('taxVAT')?.value.replace(/,/g, ''));
      const intoMoneyTotal = this.intoMoneyTotal == '' ? 0 : parseFloat(this.intoMoneyTotal);
      const totalMoney: number = intoMoneyTotal - intoMoneyTotal * disCount + intoMoneyTotal * taxVAT;
      if (e.target.value == '' && this.debtForm.get('taxVAT')?.value == '') {
        this.debtForm.get('totalMoney')?.setValue('');
      } else {
        this.debtForm.get('totalMoney')?.setValue(totalMoney.toString());
      }
    } catch (e) {
      console.log(e);
    }
  }

  enterTaxVAT(e: any) {
    try {
      const taxVAT: number = e.target.value == '' ? 0 : parseFloat(e.target.value.replace(/,/g, ''));
      const disCount: number =
        this.debtForm.get('disCount')?.value == ''
          ? 0
          : parseFloat(this.debtForm.get('disCount')?.value.replace(/,/g, ''));
      const intoMoneyTotal = this.intoMoneyTotal == '' ? 0 : parseFloat(this.intoMoneyTotal);
      const totalMoney: number = intoMoneyTotal - intoMoneyTotal * disCount + intoMoneyTotal * taxVAT;
      if (e.target.value == '' && this.debtForm.get('disCount')?.value == '') {
        this.debtForm.get('totalMoney')?.setValue('');
      } else {
        this.debtForm.get('totalMoney')?.setValue(totalMoney.toString());
      }
    } catch (e) {
      console.log(e);
    }
  }

  enterPayMoney(e: any) {
    try {
      const payMoney: number = e.target.value == '' ? 0 : parseFloat(e.target.value.replace(/,/g, ''));
      const totalMoney: number =
        this.debtForm.get('totalMoney')?.value == ''
          ? 0
          : parseFloat(this.debtForm.get('totalMoney')?.value.replace(/,/g, ''));
      const debt: number = totalMoney - payMoney;
      if (e.target.value == '' && this.debtForm.get('totalMoney')?.value == '') {
        this.debtForm.get('debt')?.setValue('');
      } else {
        this.debtForm.get('debt')?.setValue(debt.toString());
      }
    } catch (e) {
      console.log(e);
    }
  }

  GetDetail() {
    this._service
      .GetDetail({
        code: this.code,
      })
      .subscribe(
        ({data}) => {
          this.detailData = data;
          this.stateDetail = data?.state;
          console.log('this.detailData: ', this.detailData);

          this.debtForm.patchValue({});
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }

  get f() {
    return this.debtForm.controls;
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
  }

  debtClosing() {
    this.submitted = true;
    if (this.debtForm.invalid) {
      return;
    }

    Swal.fire({
      title: 'Chốt công nợ ?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Huỷ',
    }).then((result) => {
      if (result.isConfirmed) {
        const orderDetails = this.detailData.orderDetails?.map((item:any, index:number) => {
          return {
            id: item.id,
            price: index == 0 ? parseFloat(this.intoMoneyMain) : parseFloat(this.intoMoneySub)
          }
        })
        this._service
          .Update(
            {
              orderCode: this.detailData?.code,
              exportDate: moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
              disCount: this.debtForm.value.disCount,
              taxVAT: this.debtForm.value.taxVAT,
              payMoney: this.debtForm.value.payMoney,
              orderDetails: orderDetails,
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
    });
  }
}
