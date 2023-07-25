import {Component, OnInit} from '@angular/core';
import {DeviceService} from 'src/app/services/MD/device.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {DeviceCreateComponent} from '../device-create/device-create.component';
import {DeviceEditComponent} from '../device-edit/device-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {DeviceModel} from 'src/app/models/MD/device.model';
import Swal from 'sweetalert2';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {Router, ActivatedRoute} from '@angular/router';
import {DeviceFilter, optionsGroup} from 'src/app/@filter/MD/device-filter.model';
import {utils} from 'src/app/utils/utils';

@Component({
  selector: 'app-device-index',
  templateUrl: './device-index.component.html',
  styleUrls: ['./device-index.component.scss'],
})
export class DeviceIndexComponent implements OnInit {
  constructor(
    private _service: DeviceService,
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
  displayedColumns: string[] = [
    'index',
    'code',
    'name',
    'typeCode',
    'groupCode',
    'ipAddress',
    'ipPort',
    'devicePort',
    'username',
    'password',
    'isActive',
    'actions',
  ];
  paginationResult!: PaginationResult;
  filter = new DeviceFilter();
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
    this.drawerService.open(DeviceCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(DeviceIndexComponent)) {
        this.loadInit();
      }
    });
  }

  openEdit(item: any) {
    console.log(item);

    this.router.navigate([], {
      replaceUrl: true, relativeTo: this.route,
      queryParams: {
        ...this.filter,
        code: item.code,
        name: item.name,
        typeCode: item.typeCode,
        groupCode: item.groupCode,
        ipAddress: item.ipAddress,
        ipPort: item.ipPort,
        devicePort: item.devicePort,
        username: item.username,
        password: item.password,
        isActive: item.isActive,
      },
    });
    this.drawerService
      .open(DeviceEditComponent, {
        code: item.code,
        name: item.name,
        typeCode: item.typeCode,
        groupCode: item.groupCode,
        ipAddress: item.ipAddress,
        ipPort: item.ipPort,
        devicePort: item.devicePort,
        username: item.username,
        password: item.password,
        isActive: item.isActive,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(DeviceIndexComponent)) {
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
        console.log('data: ', data);
        this.paginationResult = data;

        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: DeviceFilter) => item.code == this.filter.code);
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
    this.utils.handleTable(); //them vao
    this.search();
  }

  reload() {
    this.filter = new DeviceFilter();
    this.search();
  }

  onChangePage(pageNumber: number) {
    this.filter.currentPage = pageNumber;
    this.search();
  }

  pageSizeChange(pageSize: number) {
    this.filter.pageSize = pageSize;
    this.filter.currentPage = 1;
    this.search();
  }

  deleteDevice(item: DeviceModel) {
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
