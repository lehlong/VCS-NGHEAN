import {Component, OnInit} from '@angular/core';
import {VehicleService} from 'src/app/services/MD/vehicle.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {VehicleCreateComponent} from '../vehicle-create/vehicle-create.component';
import {VehicleEditComponent} from '../vehicle-edit/vehicle-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {VehicleFilter} from 'src/app/@filter/MD/vehicle-filter.model';
import {VehicleModel} from 'src/app/models/MD/vehicle.model';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-vehicle-index',
  templateUrl: './vehicle-index.component.html',
  styleUrls: ['./vehicle-index.component.scss'],
})
export class VehicleIndexComponent {
  constructor(
    private _service: VehicleService,
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
  displayedColumns: string[] = ['index', 'code', 'imagePlate', 'imageCar','note', 'isActive', 'actions'];
  paginationResult!: PaginationResult;
  filter = new VehicleFilter();

  //Khai báo hàm
  ngOnInit(): void {
    this.loadInit();
  }

  openCreate() {
    this.drawerService.open(VehicleCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(VehicleIndexComponent)) {
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
      },
    });
    this.drawerService.open(VehicleEditComponent, item).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(VehicleIndexComponent)) {
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
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: VehicleFilter) => item.code == this.filter.code);
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

  deleteVehicle(item: VehicleModel) {
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
