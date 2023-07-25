import {Component, OnInit} from '@angular/core';
import {CustomerCareService} from 'src/app/services/MD/customer-care.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {CustomerCareCreateComponent} from '../customer-care-create/customer-care-create.component';
import {CustomerCareEditComponent} from '../customer-care-edit/customer-care-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {CustomerCareFilter,CustomerCareEditFilter} from 'src/app/@filter/MD/customer-care-filter.model';
import {CustomerCareModel} from 'src/app/models/MD/customer-care.model';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {debounce} from '../../../../utils/func-feature';
import {utils} from 'src/app/utils/utils';
import {OrderEditComponent} from 'src/app/@module/sale-orders/order/order-edit/order-edit.component';
@Component({
  selector: 'app-customer-care-index',
  templateUrl: './customer-care-index.component.html',
  styleUrls: ['./customer-care-index.component.scss'],
})
export class CustomerCareIndexComponent {
  constructor(
    private _service: CustomerCareService,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: utils,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }
  dataSource!: any;
  //Khai báo biến
  displayedColumns: string[] = ['index', 'careDate', 'customerName', 'orderCode', 'careContent', 'actions'];
  paginationResult!: PaginationResult;
  filter = new CustomerCareEditFilter();
  id : string = ''
  //Khai báo hàm
  ngOnInit(): void {
    this.loadInit();
  }

  openCreate() {
    // this.router.navigate([], {
    //   replaceUrl: true,
    //   relativeTo: this.route,
    //   queryParams: {...this.filter ,PartnerCode : ''},
    // })
    this.drawerService.open(CustomerCareCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(CustomerCareIndexComponent)) {
        this.loadInit();
      }
    });
  }

  openEdit(item: any) {
    this.id = item.id
    this.router.navigate([], {
      replaceUrl: true,
      relativeTo: this.route,
      queryParams: {
        ...this.filter,
        // careDate: item.careDate,
        orderCode: item.orderCode,
        careContent: item.careContent,
        id:item.id
      },
    });
    this.drawerService
      .open(CustomerCareEditComponent, {
        careDate: item.careDate,
        orderCode: item.orderCode,
        careContent: item.careContent,
        id: item.id,
        partnerName: item.partner?.name,
        address:item.partner?.address,
        phoneNumber: item.partner?.phoneNumber,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(CustomerCareIndexComponent)) {
          this.loadInit();
        }
      });
  }

  openDetailOrder(item: any) {
    this.router.navigate([], {
      replaceUrl: true,
      relativeTo: this.route,
      queryParams: {
        ...this.filter,
        code: item.orderCode,
      },
    });
    this.drawerService
      .open(OrderEditComponent, {
        code: item.orderCode,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(CustomerCareIndexComponent)) {
          this.loadInit();
        }
      });
  }

  search(currentPage: number = 1, pageSize: number | undefined = undefined, refresh: boolean = false) {
    this.filter = {
      ...this.filter,
      keyWord: refresh ? '' : this.filter.keyWord,
      pageSize: pageSize || this.filter.pageSize,
      currentPage: currentPage,
    };
    this._service.search(this.filter, true).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
        if (this.filter.orderCode !== '') {
          const detail = data?.data?.find((item: CustomerCareEditFilter) => item.id == this.filter.id);
          if (detail) {
            this.openEdit(detail);
            console.log(detail)
          }
        }
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  loadInit() {
    this.search(this.filter.currentPage);
    this.utils.handleTable();
  }

  onChangePage(pageNumber: number) {
    this.search(pageNumber);
  }

  pageSizeChange(pageSize: number) {
    this.filter.pageSize = pageSize;
    this.search(1, pageSize);
  }
  searchCareInfor = debounce(() => {
    this.search();
  }, 500);

  onChangePartnerCode(PartnerCode: string) {
    this.filter = new CustomerCareEditFilter();
    this.filter = {
      ...this.filter,
      PartnerCode: PartnerCode,
    };
    this.search(1);
  }
  reload() {
    this.filter = new CustomerCareEditFilter();
    this.search();
  }
}
