import {Component, OnInit} from '@angular/core';
import {PartnerService} from 'src/app/services/MD/partner.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {PartnerCreateComponent} from '../partner-create/partner-create.component';
import {PartnerEditComponent} from '../partner-edit/partner-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {PartnerFilter, optionsGroup} from 'src/app/@filter/MD/partner-filter.model';
import Swal from 'sweetalert2';
import {PartnerModel} from 'src/app/models/MD/partner.model';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
@Component({
  selector: 'app-partner-index',
  templateUrl: './partner-index.component.html',
  styleUrls: ['./partner-index.component.scss'],
})
export class PartnerIndexComponent implements OnInit {
  constructor(
    private _service: PartnerService,
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

  //Khai báo biến
  breadcrumbList: any[] = [
    {
      name: 'Trang chủ',
      path: '',
    },
    {
      name: 'Đơn vị tính',
      path: '/master-data/unit',
    },
  ];
  displayedColumns: string[] = ['index', 'code', 'name', 'address', 'phoneNumber', 'email', 'isActive', 'actions'];
  paginationResult!: PaginationResult;
  filter = new PartnerFilter();
  optionsGroup: optionsGroup[] = [];
  optionsSate = [
    {name: 'Đã kích hoạt', value: true},
    {name: 'Chưa kích hoạt', value: false},
  ];

  //Khai báo hàm
  ngOnInit(): void {
    this.loadInit();
  }

  openCreate() {
    this.drawerService.open(PartnerCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(PartnerIndexComponent)) {
        this.loadInit();
      }
    });
  }

  openEdit(item: any) {
    this.router.navigate([], {
      replaceUrl: true, relativeTo: this.route,
      queryParams: {
        ...this.filter,
        code: item.code,
        name: item.name,
        isActive: item.isActive,
        address: item.address,
        phoneNumber: item.phoneNumber,
        email: item.email,
        isProvider: item.isProvider,
        isCustomer: item.isCustomer,
      },
    });
    this.drawerService
      .open(PartnerEditComponent, {
        code: item.code,
        name: item.name,
        isActive: item.isActive,
        address: item.address,
        phoneNumber: item.phoneNumber,
        email: item.email,
        isProvider: item.isProvider,
        isCustomer: item.isCustomer,
      })
      .subscribe((result) => {
        if (result?.status) {
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
      isActive: '',
      isCustomer: '',
      isProvider: '',
    };

    this._service.search(this.filter, true).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: PartnerFilter) => item.code == this.filter.code);
          if (detail) {
            this.openEdit(detail);
          }
        }
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  loadInit() {
    this.utils.handleTable();
    this.search(this.filter.currentPage);
  }

  onChangePage(pageNumber: number) {
    this.search(pageNumber);
  }

  pageSizeChange(pageSize: number) {
    this.filter.pageSize = pageSize;
    this.search(1, pageSize);
  }
  deleteCustomer(item: PartnerModel) {
    Swal.fire({
      title: 'Bạn muốn xóa dữ liệu này?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this._service.Delete(item, true).subscribe({
          next: ({data}) => {
            this.loadInit();
          },
          error: (response) => {
            console.log(response);
          },
        });
      }
    });
  }
}
