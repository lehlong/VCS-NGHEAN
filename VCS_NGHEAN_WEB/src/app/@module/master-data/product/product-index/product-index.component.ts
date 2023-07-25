import {Component, OnInit} from '@angular/core';
import {ProductService} from 'src/app/services/MD/product.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {ProductCreateComponent} from '../product-create/product-create.component';
import {ProductEditComponent} from '../product-edit/product-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {ProductModel} from 'src/app/models/MD/product.model';
import Swal from 'sweetalert2';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ProductFilter, optionsGroup} from 'src/app/@filter/MD/product-filter.model';
import {utils} from 'src/app/utils/utils';
@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrls: ['./product-index.component.scss'],
})
export class ProductIndexComponent implements OnInit {
  constructor(
    private _service: ProductService,
    private drawerService: DrawerService,
    private utils: utils,
    private router: Router,
    private route: ActivatedRoute,
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
      name: 'Sản Phẩm',
      path: '/master-data/san-pham',
    },
  ];
  displayedColumns: string[] = [
    'index',
    'typeCode',
    'code',
    'name',
    'unitCode',
    'costPrice',
    'sellPrice',
    'isMainObject',
    'isQuantitative',
    'isActive',
    'actions',
  ];
  paginationResult!: PaginationResult;
  filter = new ProductFilter();
  optionsGroup: optionsGroup[] = [];
  optionsSate = [
    {name: 'Đã kích hoạt', value: true},
    {name: 'Chưa kích hoạt', value: false},
  ];

  //Khai báo hàm
  ngOnInit(): void {
    this.loadInit();
  }

  openDrawer(data?: ProductModel) {
    this.drawerService.open(ProductCreateComponent, {editData: data}).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(ProductIndexComponent)) {
        this.loadInit();
      }
    });
  }

  // openEdit(item: any) {
  //   this.router.navigate([], {
  //     replaceUrl: true, relativeTo: this.route,
  //     queryParams: {
  //       ...this.filter,
  //       code: item.code,
  //       name: item.name,
  //       isActive: item.isActive,
  //       unitCode: item.unitCode,
  //       typeCode: item.typeCode,
  //     },
  //   });
  //   this.drawerService
  //     .open(ProductEditComponent, {
  //       code: item.code,
  //       name: item.name,
  //       isActive: item.isActive,
  //       unitCode: item.unitCode,
  //       typeCode: item.typeCode,
  //     })
  //     .subscribe((result) => {
  //       if (result?.status && this.utils.checkComponent(ProductIndexComponent)) {
  //         this.loadInit();
  //       }
  //     });
  // }
  search(currentPage: number = 1, pageSize: number | undefined = undefined, refresh: boolean = false) {
    this.filter = {
      ...this.filter,
      keyWord: refresh ? '' : this.filter.keyWord,
      pageSize: pageSize || this.filter.pageSize,
      currentPage: currentPage,
      isActive: '',
      typeCode: '',
    };
    this._service.search(this.filter, true).subscribe({
      next: ({data}) => {
        console.log(data);

        this.paginationResult = data;
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: ProductFilter) => item.code == this.filter.code);
          if (detail) {
            this.openDrawer(detail);
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

  deleteProduct(item: ProductModel) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa dữ liệu?',
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
