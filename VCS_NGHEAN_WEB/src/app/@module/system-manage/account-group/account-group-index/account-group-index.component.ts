import { Component, OnInit } from '@angular/core';
import { AccountGroupService } from 'src/app/services/AD/account-group.service';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { AccountGroupCreateComponent } from '../account-group-create/account-group-create.component';
import { AccountGroupEditComponent } from '../account-group-edit/account-group-edit.component';
import { PaginationResult } from 'src/app/models/Common/pagination.model';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';
import { AccountGroupModel } from 'src/app/models/AD/account-group.model';
import Swal from 'sweetalert2';
import {utils} from 'src/app/utils/utils';
@Component({
  selector: 'app-account-group-index',
  templateUrl: './account-group-index.component.html',
  styleUrls: ['./account-group-index.component.scss'],
})
export class AccountGroupIndexComponent implements OnInit {
  currentTab:number = 1;
  constructor(
    private _service: AccountGroupService,
    private drawerService: DrawerService,
    private utils: utils,
  ) {}

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
  displayedColumns: string[] = ['index', 'name', 'notes', 'state', 'actions'];
  paginationResult!: PaginationResult;
  filter = new BaseFilter();

  //Khai báo hàm
  ngOnInit(): void {
    this.loadInit();
  }

  openCreate() {
    this.drawerService.open(AccountGroupCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(AccountGroupIndexComponent)) {
        this.loadInit();
      }
    });
  }

  openEdit(item: any) {
    this.drawerService
      .open(AccountGroupEditComponent, {
        ...item,
        currentTab: this.currentTab
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(AccountGroupIndexComponent)) {
          this.loadInit();
        }

        if(result.type == 'tab') {
          this.currentTab = result.tab;
        }
      });
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
    this.search();
  }

  onChangePage(pageNumber: number) {
    this.search(pageNumber);
  }

  pageSizeChange(pageSize: number) {
    this.filter.pageSize = pageSize;
    this.search(1, pageSize);
  }

  deleteAccountGroup(item: AccountGroupModel) {
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
          next: ({ data }) => {
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
