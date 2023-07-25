import {Component, OnInit} from '@angular/core';
import { PumpRigFilter, optionsArea } from 'src/app/@filter/MD/pump-rig-filter.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {PumpRigService} from 'src/app/services/MD/pump-rig.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {PumpRigCreateComponent} from '../pump-rig-create/pump-rig-create.component';
import Swal from 'sweetalert2';
import {PumpRigEditComponent} from '../pump-rig-edit/pump-rig-edit.component';
import {utils} from 'src/app/utils/utils';
import { Router } from '@angular/router';
import { AreaService } from 'src/app/services/MD/area.service';

@Component({
  selector: 'app-pump-rig-index',
  templateUrl: './pump-rig-index.component.html',
  styleUrls: ['./pump-rig-index.component.scss'],
})
export class PumpRigIndexComponent implements OnInit {
  paginationResult!: PaginationResult;
  displayedColumns: string[] = ['index', 'code', 'name','areaCode', 'isActive'];
  filter = new PumpRigFilter();
  filterGroup = new BaseFilter();
  optionsGroup: optionsArea[] = [];
  optionsSate = [
    {name: 'Đã kích hoạt', value: true},
    {name: 'Chưa kích hoạt', value: false},
  ];
  constructor(
    private _prs: PumpRigService,
    private _ds: DrawerService,
    private _as: AreaService,
    private utils: utils,
  ) {}
  ngOnInit(): void {
    this.loadInit();
    this.getAllArea();
  }

  search(currentPage: number = 1, pageSize: number | undefined = undefined, refresh: boolean = false) {
    this.filter = {
      ...this.filter,
    };
    this._prs.search(this.filter, true).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  getAllArea() {
    this.filterGroup.pageSize = 100;
    this._as.search(this.filterGroup).subscribe({
      next: ({data}) => {
        this.optionsGroup = data.data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  onChangeArea(e: any) {
    this.search();
  }

  onChangeState(e: any) {
    this.search();
  }

  refresh() {
    this.filter.currentPage = 1;
    this.filter.keyWord = '';
    this.search();
  }

  loadInit() {
    this.search();
  }

  openCreate() {
    this._ds.open(PumpRigCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(PumpRigIndexComponent)) {
        this.loadInit();
      }
    });
  }

  openEdit(item: any) {
    this._ds
      .open(PumpRigEditComponent, {
        code: item.code,
        name: item.name,
        areaCode : item.areaCode,
        isActive: item.isActive,
        areaName: item.area?.name,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(PumpRigIndexComponent)) {
          this.loadInit();
        }
      });
  }

  deleteItem(item: any) {
    Swal.fire({
      title: 'Bạn muốn xóa dữ liệu này?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this._prs.Delete(item, true).subscribe({
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

  onChangePage(pageNumber: number) {
    this.search(pageNumber);
  }

  pageSizeChange(pageSize: number) {
    this.filter.pageSize = pageSize;
    this.search(1, pageSize);
  }
}
