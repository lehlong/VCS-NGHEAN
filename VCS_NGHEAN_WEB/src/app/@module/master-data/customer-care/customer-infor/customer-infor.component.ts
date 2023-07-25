import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomerService } from 'src/app/services/MD/customer.service';
import { PaginationResult } from 'src/app/models/Common/pagination.model';
import { CustomerFilter } from 'src/app/@filter/MD/customer-filter.model';
import { CustomerInforFilter } from 'src/app/@filter/MD/customer-infor-filter.model';
import { Router, ActivatedRoute } from '@angular/router';
import {debounce} from '../../../../utils/func-feature'
@Component({
  selector: 'app-customer-infor',
  templateUrl: './customer-infor.component.html',
  styleUrls: ['./customer-infor.component.scss']
})
export class CustomerInforComponent {

  @Output() partnerCodeChange = new EventEmitter<string>();

  constructor(
    private _service: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.filter = {
        ...this.filter,
        ...params
      }
      this.onlyFilterCode = {
        ...this.onlyFilterCode,
        ...params
      }
    });
  }
  dataSource!: any;
  //Khai báo biến
  displayedColumns: string[] = [ 'code', 'name'];
  paginationResult!: PaginationResult;
  filter = new CustomerFilter();
  onlyFilterCode = new CustomerInforFilter()
  //Khai báo hàm
  ngOnInit(): void {
    this.loadInit();
  }
  search(
    currentPage: number = 1,
    pageSize: number | undefined = undefined,
    refresh: boolean = false
  ) {
    this.filter = {
      ...this.filter,
      keyWord: refresh ? '' : this.filter.keyWord,
      pageSize: pageSize || this.filter.pageSize,
      currentPage: currentPage,
    };
    this._service.search(this.filter, true).subscribe({
      next: ({ data }) => {
        this.paginationResult = data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  loadInit() {
    this.search(this.filter.currentPage);
  }

  onChangePage(pageNumber: number) {
    this.search(pageNumber);
  }

  pageSizeChange(pageSize: number) {
    this.filter.pageSize = pageSize;
    this.search(1, pageSize);
  }
  ChooseCustomer(item :any){
    // this.router.navigate([], { replaceUrl: true, relativeTo: this.route, queryParams: {
    //   ...this.onlyFilterCode,
    //   PartnerCode: item.code,
    // }});
    //  this.router.navigate([], { replaceUrl: true, relativeTo: this.route, queryParams: {}});
    this.partnerCodeChange.emit(item.code)
  }  
  searchCustomer = debounce(() => {
    this.search();
  }, 500);
}
