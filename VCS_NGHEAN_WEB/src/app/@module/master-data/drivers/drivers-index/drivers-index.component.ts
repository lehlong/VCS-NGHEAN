import {Component, OnInit} from '@angular/core';
import {DriversService} from 'src/app/services/MD/drivers.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {DriversCreateComponent} from '../drivers-create/drivers-create.component';
import {DriversEditComponent} from '../drivers-edit/drivers-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {DriversFilter} from 'src/app/@filter/MD/drivers-filter.model';
import {DriversModel} from 'src/app/models/MD/drivers.model';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-drivers-index',
  templateUrl: './drivers-index.component.html',
  styleUrls: ['./drivers-index.component.scss'],
})
export class DriversIndexComponent {
  constructor(
    private _service: DriversService,
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
  apiUrlImage = environment.apiUrlImage;

  //Khai báo biến
  displayedColumns: string[] = ['index', 'fullName', 'phoneNumber', 'imageLeft','imageFront','imageRight', 'isActive', 'actions'];
  paginationResult!: PaginationResult;
  filter = new DriversFilter();

  //Khai báo hàm
  ngOnInit(): void {
    this.loadInit();
  }

  openCreate() {
    this.drawerService.open(DriversCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(DriversIndexComponent)) {
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
      },
    });
    this.drawerService.open(DriversEditComponent, item).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(DriversIndexComponent)) {
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
        if (this.filter.fullName !== '') {
          const detail = data?.data?.find((item: DriversFilter) => item.fullName == this.filter.fullName);
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

  deleteDrivers(item: DriversModel) {
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
