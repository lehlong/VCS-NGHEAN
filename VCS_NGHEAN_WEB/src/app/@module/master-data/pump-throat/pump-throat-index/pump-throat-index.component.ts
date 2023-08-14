import {Component} from '@angular/core';
import {PumpThroatService} from 'src/app/services/MD/pump-throat.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {PumpThroatCreateComponent} from '../pump-throat-create/pump-throat-create.component';
import {PumpThroatEditComponent} from '../pump-throat-edit/pump-throat-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {PumpThroatFilter} from 'src/app/@filter/MD/pump-throat-filter.model';
import {PumpThroatModel} from 'src/app/models/MD/pump-throat.model';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
import { PumpRigService } from 'src/app/services/MD/pump-rig.service';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';
@Component({
  selector: 'app-pump-throat-index',
  templateUrl: './pump-throat-index.component.html',
  styleUrls: ['./pump-throat-index.component.scss'],
})
export class PumpThroatIndexComponent {
  constructor(
    private _pts: PumpThroatService,
    private _prs : PumpRigService,
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

  dataPumpRig: any[] = [];
  filterPumpRig = new BaseFilter();

  //Khai báo biến
  displayedColumns: string[] = ['index','code','name','areaCode','goodsCode', 'wattage','isActive', 'actions'];
  paginationResult!: PaginationResult;
  filter = new PumpThroatFilter();
  optionsSate = [
    {name: 'Đã kích hoạt', value: true},
    {name: 'Chưa kích hoạt', value: false},
  ];

  //Khai báo hàm
  ngOnInit(): void {
    this.getAllPumpRig();
    this.loadInit();
  }

  getAllPumpRig() {
    this.filterPumpRig.pageSize = 100;
    this._prs.search(this.filterPumpRig).subscribe({
      next: ({data}) => {
        this.dataPumpRig = data.data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  openCreate() {
    this.drawerService.open(PumpThroatCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(PumpThroatIndexComponent)) {
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
        areaCode: item.areaCode,
        areaName : item.area?.name,
        goodsCode : item.goodsCode,
        goodsName : item.goods?.name,
        pumpRigCode : item.pumpRigCode,
        pumpRigName :this.dataPumpRig.find(x => x.code == item.pumpRigCode)?.name,
        wattage : item.wattage
      },
    });
    this.drawerService
      .open(PumpThroatEditComponent, {
        code: item.code,
        name: item.name,       
        isActive: item.isActive,
        areaCode: item.areaCode,
        areaName : item.area?.name,
        goodsCode : item.goodsCode,
        goodsName : item.goods?.name,
        pumpRigCode : item.pumpRigCode,
        pumpRigName : this.dataPumpRig.find(x => x.code == item.pumpRigCode)?.name,
        wattage : item.wattage
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(PumpThroatIndexComponent)) {
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
    this._pts.search(this.filter, true).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: PumpThroatFilter) => item.code == this.filter.code);
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

  deletePumpThroat(item: PumpThroatModel) {
    Swal.fire({
      title: 'Bạn muốn xóa dữ liệu này?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this._pts.Delete(item, true).subscribe({
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
