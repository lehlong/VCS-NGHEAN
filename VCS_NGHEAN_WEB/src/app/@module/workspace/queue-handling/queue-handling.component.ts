import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderCarFilter } from 'src/app/@filter/WS/order-car-filter.model';
import { PaginationResult } from 'src/app/models/Common/pagination.model';
import { OrderCarModel } from 'src/app/models/WS/order-car.model';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { GlobalService } from 'src/app/services/Common/global.service';
import { OrderCarService } from 'src/app/services/WS/order-car.service';
import {utils} from 'src/app/utils/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-queue-handling',
  templateUrl: './queue-handling.component.html',
  styleUrls: ['./queue-handling.component.scss']
})
export class QueueHandlingComponent {

  userInfo = this._gs.getUserInfo();
constructor(
    private _service: OrderCarService,
    private _gs : GlobalService,
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
  displayedColumns: string[] = ['order', 'vehicle', 'driver','notes', 'actions'];
  paginationResult!: PaginationResult;
  filter = new OrderCarFilter();
  optionsGroup: any[] = [];
  optionsSate = [
    {name: 'Đã kích hoạt', value: true},
    {name: 'Chưa kích hoạt', value: false},
  ];

  //Khai báo hàm
  ngOnInit(): void {
    this.loadInit();
  }

  search(currentPage: number = 1, pageSize: number | undefined = undefined, refresh: boolean = false) {
    this.filter = {
      ...this.filter,
      keyWord: refresh ? '' : this.filter.keyWord,
      pageSize: pageSize || this.filter.pageSize,
      currentPage: currentPage,
      areaCode: this.userInfo.areaCode,
    };
    this._service.search(this.filter, true).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
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

  deleteArea(item: OrderCarModel) {
    Swal.fire({
      title: 'Bạn muốn huỷ xếp hàng xe này?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
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
