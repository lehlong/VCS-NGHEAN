import {Component} from '@angular/core';
import {UserTypeService} from 'src/app/services/MD/user-type.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {UserTypeCreateComponent} from '../user-type-create/user-type-create.component';
import {UserTypeEditComponent} from '../user-type-edit/user-type-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {UserTypeFilter, optionsGroup} from 'src/app/@filter/MD/user-type-filter.model';
import {UserTypeModel} from 'src/app/models/MD/user-type.model';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
@Component({
  selector: 'app-UserType-index',
  templateUrl: './user-type-index.component.html',
  styleUrls: ['./user-type-index.component.scss'],
})
export class UserTypeIndexComponent {
  constructor(
    private _service: UserTypeService,
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
  displayedColumns: string[] = ['index', 'id', 'name', 'isActive', 'actions'];
  paginationResult!: PaginationResult;
  filter = new UserTypeFilter();
  optionsUserType: optionsGroup[] = [];
  optionsSate = [
    {name: 'Đã kích hoạt', value: true},
    {name: 'Chưa kích hoạt', value: false},
  ];

  //Khai báo hàm
  ngOnInit(): void {
    this.loadInit();
  }

  openCreate() {
    this.drawerService.open(UserTypeCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(UserTypeIndexComponent)) {
        this.loadInit();
      }
    });
  }

  openEdit(item: any) {
    this.router.navigate([], {
      replaceUrl: true, relativeTo: this.route,
      queryParams: {
        ...this.filter,
        id: item.id,
        name: item.name,
        isActive: item.isActive,
      },
    });
    this.drawerService
      .open(UserTypeEditComponent, {
        id: item.id,
        name: item.name,
        isActive: item.isActive,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(UserTypeIndexComponent)) {
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
    };
    this._service.search(this.filter, true).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
        if (this.filter.id !== '') {
          const detail = data?.data?.find((item: UserTypeFilter) => item.id == this.filter.id);
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

  deleteUserType(item: UserTypeModel) {
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
