import {Component} from '@angular/core';
import {OrderService} from 'src/app/services/SO/order.service';
import {CustomerCareService} from 'src/app/services/MD/customer-care.service';
import {FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import * as moment from 'moment';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {Router, ActivatedRoute} from '@angular/router';
import { CustomerCareFilter , CustomerCareEditFilter} from 'src/app/@filter/MD/customer-care-filter.model';
@Component({
  selector: 'app-customer-care-edit',
  templateUrl: './customer-care-edit.component.html',
  styleUrls: ['./customer-care-edit.component.scss'],
})
export class CustomerCareEditComponent {
  ctcForm: FormGroup;
  submitted: boolean = false;
  careDate: string = '';
  orderCode: string = '';
  careContent: string = '';
  dateCare: string = '';
  timeCare: string = '';
  listOrderAll : any = [];
  partnerCode: string = '';
  id: string ='';
  partnerName: string ='';
  address: string ='';
  phoneNumber: string ='';
  filter = new CustomerCareEditFilter();
  constructor(
    private _service: CustomerCareService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.ctcForm = this._fb.group({
      orderCode: [{value: '', disabled: true}],
      careContent: ['', [Validators.required]],
      dateCare: [{value: '', disabled: true}],
      timeCare: [{value: '', disabled: true}],
      partnerName: [{value: '', disabled: true}],
      address: [{value: '', disabled: true}],
      phoneNumber: [{value: '', disabled: true}],
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
    
    this.ctcForm?.get('orderCode')?.setValue(this.orderCode);
    this.ctcForm?.get('dateCare')?.setValue(moment(this.careDate).format('YYYY-MM-DD'));
    this.ctcForm?.get('timeCare')?.setValue(moment(this.careDate).format('HH:mm'));
    this.ctcForm?.get('careContent')?.setValue(this.careContent);
    this.ctcForm?.get('partnerName')?.setValue(this.partnerName);
    this.ctcForm?.get('address')?.setValue(this.address);
    this.ctcForm?.get('phoneNumber')?.setValue(this.phoneNumber);
    this.getPartnerCode();
  }

  loadInit() {}

  get f() {
    return this.ctcForm.controls;
  }

  close() {
    this.filter = {
      ...this.filter,
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: {}});
    this.drawerService.close();
  }

  getPartnerCode() {
    this.dropdownService.GetAllOrder().subscribe(
      ({data}) => {
        this.listOrderAll = data;
        const listFilterPartnerCode = this.listOrderAll.filter((item:any) => {
          return item.code === this.orderCode
        })
        this.partnerCode = listFilterPartnerCode[0]?.partnerCode
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  onEdit() {
  this.submitted = true;
  const dateTime = moment(`${moment(this.careDate).format('YYYY-MM-DD')} ${moment(this.careDate).format('HH:mm')}`, 'YYYY-MM-DD HH:mm');
  const careDate = dateTime.format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
  this.getPartnerCode();
    if (this.ctcForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          id: this.id,
          orderCode: this.orderCode.trim(),
          careDate: careDate,
          careContent: this.ctcForm.value.careContent.trim(),
          partnerCode: this.partnerCode
        },
        false,
      )
      .subscribe(
        (data) => {      
          this.submitted = false;
          this.drawerService.returnData(data);
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
