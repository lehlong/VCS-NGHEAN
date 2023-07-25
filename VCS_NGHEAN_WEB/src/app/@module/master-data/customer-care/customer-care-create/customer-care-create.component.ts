import {Component} from '@angular/core';
import {CustomerCareService} from 'src/app/services/MD/customer-care.service';
import {FormBuilder, 
        FormGroup, 
        Validators, 
      } from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import * as moment from 'moment';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {Router, ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { CustomerListOrderComponent } from '../customer-list-order/customer-list-order.component';
import {STATE_ORDER} from 'src/app/utils/constant/index';

@Component({
  selector: 'app-customer-care-create',
  templateUrl: './customer-care-create.component.html',
  styleUrls: ['./customer-care-create.component.scss']
})
export class CustomerCareCreateComponent {
  ctcForm: FormGroup;
  submitted: boolean = false;
  displayDate: string | null = 'Ngày chăm sóc';
  
  // listOrderAll: any = [];
  // listOrderFilter: any = [];

  listPartnerAll: any = [];
  listPartnerFilter: any = [];

  partnerCode : string = '';
  codeOrder : string = '';
  showOrderCode : boolean = false;

  state_order = STATE_ORDER;

  constructor(
    private _fb: FormBuilder,
    private _service: CustomerCareService, 
    private utils: utils,
    private drawerService: DrawerService,
    public dialog: MatDialog,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.ctcForm = this._fb.group({
      partnerName: ['', [Validators.required]],
      orderCode: [{value: '', disabled: true}],
      dateOrder: [{value: '', disabled: true}],
      itemOrder: [{value: '', disabled: true}],
      phoneOrder: [{value: '', disabled: true}],
      statusOrder: [{value: '', disabled: true}],
      careContent: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadInit();
  }

  loadInit() {
    // this.GetAllOrder();
    this.GetAllPartner();
  }

  viewListOrder() {
    const dialogRef = this.dialog.open(CustomerListOrderComponent);
    dialogRef.componentInstance.partnerCode = this.partnerCode;
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let date = moment(result.createDate).format('DD-MM-YYYY');
          
        this.ctcForm.get("orderCode")?.setValue(result.code);
        this.ctcForm.get("dateOrder")?.setValue(date);
        this.ctcForm.get("itemOrder")?.setValue(result.itemName);
        this.ctcForm.get("phoneOrder")?.setValue(result.phoneNumber);
        this.ctcForm.get("statusOrder")?.setValue(this.state_order[result?.state]?.name);
        this.showOrderCode = true;   
        this.codeOrder = result.code;
      }
    });
  }

  // onChangeOrder(event: any) {
  //   this.listOrderFilter = this.listOrderAll.filter((item: any) => {
  //     return item.code.toLowerCase().includes(event.target.value.toLowerCase());
  //   });
  // }
  onChangePartner(event: any) {
    this.listPartnerFilter = this.listPartnerAll.filter((item: any) => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }

  // selectOrder(item: any, event: any) {
  //   if (event.isUserInput) {
  //     this.ctcForm.get("orderCode")?.setValue(item.code);
  //     this.partnerCode = item?.partnerCode;
  //   }
  // }
   selectPartner(item: any, event: any) {
    this.partnerCode = item.code;
    // this.search();
    this.ctcForm.get("orderCode")?.setValue('');
    this.ctcForm.get("dateOrder")?.setValue('');
    this.ctcForm.get("itemOrder")?.setValue('');
    this.ctcForm.get("phoneOrder")?.setValue('');
    this.ctcForm.get("statusOrder")?.setValue('');
  }

  // GetAllOrder() {
  //   this.dropdownService.GetAllOrder().subscribe(
  //     ({data}) => {
  //       this.listOrderAll = data;
  //       this.listOrderFilter = data;
  //     },
  //     (error) => {
  //       console.log('error: ', error);
  //     },
  //   );
  // }
  GetAllPartner() {
    this.dropdownService.GetAllPartner({IsCustomer:true , IsActive:true}).subscribe(
      ({data}) => {
        this.listPartnerAll = data;
        this.listPartnerFilter= data
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  get f() {
    return this.ctcForm.controls;
  }

  close() {
    this.drawerService.close();
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: {}});
    this.drawerService.close();
  }
  handleAutocompleteData() {
    const partner = this.listPartnerAll.find((item:any) => item.name == this.ctcForm.value.partnerName);
    if(!partner || partner?.name !== this.ctcForm.value.partnerName) {
      this.listPartnerFilter = this.listPartnerAll;
    }
  }
  onCreate() {
    // this.handleAutocompleteData();
    this.submitted = true;
    if (this.ctcForm.invalid) {
      return;
    }
   console.log('result:::::::',this.ctcForm.value , this.codeOrder);
   if(this.codeOrder){
    let currentDateTime = moment().format('YYYY-MM-DDTHH:mm:ss.SSS')+'Z';
    this._service
    .Insert(
      {
        orderCode : this.codeOrder,
        partnerCode:this.partnerCode,
        careDate: currentDateTime,
        careContent: this.ctcForm.value.careContent.trim()
      },
      false,
    )
    .subscribe(
      (data) => {
        this.drawerService.returnData(data);
        this.submitted = false;
        this.ctcForm?.get('partnerName')?.setValue('');
        this.ctcForm?.get('careContent')?.setValue('');
        this.ctcForm?.get("orderCode")?.setValue('');
        this.ctcForm?.get("dateOrder")?.setValue('');
        this.ctcForm?.get("itemOrder")?.setValue('');
        this.ctcForm?.get("phoneOrder")?.setValue('');
        this.ctcForm?.get("statusOrder")?.setValue('');
        // this.close()
      },
      (error) => {
        console.log('error: ', error);
      },
    );
   }else{
    let currentDateTime = moment().format('YYYY-MM-DDTHH:mm:ss.SSS')+'Z';
    this._service
    .Insert(
      {
        partnerCode:this.partnerCode,
        careDate: currentDateTime,
        careContent: this.ctcForm.value.careContent.trim()
      },
      false,
    )
    .subscribe(
      (data) => {
        this.drawerService.returnData(data);
        this.submitted = false;
        this.ctcForm?.get('partnerName')?.setValue('');
        this.ctcForm?.get('careContent')?.setValue('');
        this.ctcForm?.get("orderCode")?.setValue('');
        this.ctcForm?.get("dateOrder")?.setValue('');
        this.ctcForm?.get("itemOrder")?.setValue('');
        this.ctcForm?.get("phoneOrder")?.setValue('');
        this.ctcForm?.get("statusOrder")?.setValue('');
        // this.close()
      },
      (error) => {
        console.log('error: ', error);
      },
    );
   }
  }
}
