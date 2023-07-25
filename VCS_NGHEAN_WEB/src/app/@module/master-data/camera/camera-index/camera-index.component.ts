import {Component} from '@angular/core';
import {CameraService} from 'src/app/services/MD/camera.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {CameraCreateComponent} from '../camera-create/camera-create.component';
import {CameraEditComponent} from '../camera-edit/camera-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {CameraFilter} from 'src/app/@filter/MD/camera-filter.model';
import {CameraModel} from 'src/app/models/MD/camera.model';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
@Component({
  selector: 'app-camera-index',
  templateUrl: './camera-index.component.html',
  styleUrls: ['./camera-index.component.scss'],
})
export class CameraIndexComponent {
  constructor(
    private _service: CameraService,
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
  displayedColumns: string[] = ['index','name','sourceRtsp','linkPlay','areaCode', 'inOut','isActive', 'actions'];
  paginationResult!: PaginationResult;
  filter = new CameraFilter();
  optionsSate = [
    {name: 'Đã kích hoạt', value: true},
    {name: 'Chưa kích hoạt', value: false},
  ];

  //Khai báo hàm
  ngOnInit(): void {
    this.loadInit();
  }

  openCreate() {
    this.drawerService.open(CameraCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(CameraIndexComponent)) {
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
        sourceRtsp: item.sourceRtsp,
        linkPlay: item.linkPlay,
        isActive: item.isActive,
        areaCode: item.areaCode,
        inOut: item.inOut,
        linkCapture: item.linkCapture,
        userName:item.userName,
        password: item.password,
        areaName : item.area?.name,
        inOutName : item.inOut == 'in' ? 'Vào' : 'Ra'
      },
    });
    this.drawerService
      .open(CameraEditComponent, {
        id: item.id,
        name: item.name,
        sourceRtsp: item.sourceRtsp,
        linkPlay: item.linkPlay,
        isActive: item.isActive,
        areaCode: item.areaCode,
        inOut : item.inOut,
        linkCapture: item.linkCapture,
        userName:item.userName,
        password: item.password,
        areaName : item.area?.name,
        inOutName : item.inOut == 'in' ? 'Vào' : 'Ra'
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(CameraIndexComponent)) {
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
          const detail = data?.data?.find((item: CameraFilter) => item.id == this.filter.id);
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

  deleteCamera(item: CameraModel) {
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
