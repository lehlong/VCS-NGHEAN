import {Component} from '@angular/core';
import {OrderService} from 'src/app/services/SO/order.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {OrderFilter} from 'src/app/@filter/SO/order-filter.model';
import {OrderModel, orderDetails} from 'src/app/models/SO/order.model';
import {Router, ActivatedRoute} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import * as moment from 'moment';
import {STATE_ORDER, LIST_STATE} from 'src/app/utils/constant/index';
import {OrderCreateComponent} from '../../order/order-create/order-create.component';
import {OrderEditComponent} from '../../order/order-edit/order-edit.component';
import {OrderReleaseCreateComponent} from '../order-release-create/order-release-create.component';
import {OrderReleaseEditComponent} from '../order-release-edit/order-release-edit.component';
import {utils} from 'src/app/utils/utils';
import {OrderReleaseService} from 'src/app/services/SO/orderRelease.service';
import {FormControl} from '@angular/forms';
import {OrderReleaseFilter} from 'src/app/@filter/SO/orderRelease-filter';
import {LIST_ORDER_RELEASE, ORDER_RELEASE_STATES} from 'src/app/utils/constant/orderRelease';
import {OrderReleaseDetailComponent} from '../order-release-detail/order-release-detail.component';
import {MatDialog} from '@angular/material/dialog';
import {ORDER_STEPS, lstStep} from 'src/app/utils/constant/constant';
import {OrderReleaseInfoComponent} from '../order-release-info/order-release-info.component';

@Component({
  selector: 'app-order-release-index',
  templateUrl: './order-release-index.component.html',
  styleUrls: ['./order-release-index.component.scss'],
})
export class OrderReleaseIndexComponent {
  states = new FormControl();

  selectedStates: any = [];
  listPartnerAll: any = [];
  listItemAll: any = [];

  listPartnerFilter: any = [];
  listItemFilter: any = [];

  displayedColumns: string[] = [
    '#',
    '#',
    'STT',
    'Mã đơn',
    'Ngày đặt hàng',
    'Ngày giờ đổ',
    'Hàng hoá',
    'Địa điểm đổ',
    'Khách hàng',
    'Số điện thoại',
    'Lượng đặt',
    'Trạng thái',
    'Người tạo',
  ];
  paginationResult!: PaginationResult;
  state_order = STATE_ORDER;
  list_state_order: any = [];
  list_state = ORDER_RELEASE_STATES;
  state_orderRelease = LIST_ORDER_RELEASE;
  orderCodesSelected: any = [];
  filter = new OrderReleaseFilter();

  partnerSelected = {
    code: '',
    name: '',
  };

  itemSelected = {
    code: '',
    name: '',
  };

  constructor(
    private _service: OrderService,
    private _oss: OrderReleaseService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: utils,
    public dialog: MatDialog,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });

    this.list_state_order = LIST_STATE.filter((s: any) => s.value != 'CHUA_XAC_NHAN');
  }

  ngOnInit(): void {
    this.loadInit();
  }

  ngAfterViewInit() {
    this.utils.handleTable();
  }

  onChangePartner(event: any) {
    this.listPartnerFilter = this.listPartnerAll.filter((item: any) => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }

  onChangeItem(event: any) {
    this.listItemFilter = this.listItemAll.filter((item: any) => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }

  selectPartner(item: any, event: any) {
    if (event.isUserInput) {
      this.partnerSelected.code = item.code;
      this.partnerSelected.name = item.name;
    }
  }

  selectItem(item: any, event: any) {
    if (event.isUserInput) {
      this.itemSelected.name = item.name;
      this.itemSelected.code = item.code;
    }
  }

  GetAllPartner() {
    this.dropdownService.GetAllPartner().subscribe(
      ({data}) => {
        this.listPartnerAll = data;
        this.listPartnerFilter = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllItem() {
    this.dropdownService.GetAllItem().subscribe(
      ({data}) => {
        this.listItemAll = data;
        this.listItemFilter = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  openEdit(item: any) {
    this.router.navigate([], {
      replaceUrl: true,
      relativeTo: this.route,
      queryParams: {
        ...this.filter,
        code: item.code,
      },
    });
    this.drawerService
      .open(OrderReleaseDetailComponent, {
        code: item.code,
        isFromOrderRelease: true,
      })
      .subscribe((result) => {
        if (result?.status) {
          const index = this.paginationResult.data.findIndex((o: any) => o.code == result.data.orderCode);
          if (index < 0) {
            return;
          }
          const orderReleases = this.paginationResult.data[index].orderReleases;
          const indexOR = orderReleases.findIndex((or: any) => or.code == result.data.code);
          if (indexOR < 0) {
            this.paginationResult.data[index].orderReleases = [
              ...this.paginationResult.data[index].orderReleases,
              result.data,
            ];
          }
        }
      });
  }

  handleAutocomplete(first: boolean = false) {
    if (first) {
      setTimeout(() => {
        this.partnerSelected.code = this.filter.PartnerCode;
        const partnerData = this.listPartnerAll.find((item: any) => {
          return item.code == this.filter.PartnerCode;
        });
        this.partnerSelected.name = partnerData?.name || '';

        this.itemSelected.code = this.filter.ItemCode;
        const itemData = this.listItemAll.find((item: any) => {
          return item.code == this.filter.ItemCode;
        });
        this.itemSelected.name = itemData?.name || '';
      }, 200);
    } else {
      const partnerData = this.listPartnerAll.find((item: any) => {
        return item.name === this.partnerSelected.name;
      });
      if (partnerData) {
        this.filter.PartnerCode = this.partnerSelected.code;
      } else {
        this.filter.PartnerCode = '';
        this.partnerSelected.name = '';
        this.partnerSelected.code = '';
        this.listPartnerAll = this.listPartnerAll.map((item: any) => {
          return {
            ...item,
            selected: false,
          };
        });
        this.listPartnerFilter = this.listPartnerAll;
      }

      const itemData = this.listItemAll.find((item: any) => {
        return item.name === this.itemSelected.name;
      });
      if (itemData) {
        this.filter.ItemCode = this.itemSelected.code;
      } else {
        this.filter.ItemCode = '';
        this.itemSelected.name = '';
        this.itemSelected.code = '';
        this.listItemAll = this.listItemAll.map((item: any) => {
          return {
            ...item,
            selected: false,
          };
        });
        this.listItemFilter = this.listItemAll;
      }
    }
  }

  search(first: boolean = false) {
    this.handleAutocomplete(first);
    this.filter.States = this.selectedStates.map((item: any) => item.value);
    this._oss.search(this.filter, true).subscribe({
      next: ({data}) => {
        this.paginationResult = {
          ...data,
          // data: data?.data.map((item: OrderModel) => {
          //   const orderMain = item?.orderDetails?.find((element: orderDetails) => element?.isMainItem);
          //   return {
          //     ...item,
          //     createDate: moment(item.createDate).format('MM-DD-YYYY'),
          //     pourDate: moment(item.pourDate).format('MM-DD-YYYY HH:mm'),
          //     itemName: orderMain?.item?.name || '',
          //     orderNumber: orderMain?.orderNumber || 0,
          //     partnerName: item?.partner?.name || '',
          //     phoneNumber: item?.partner?.phoneNumber || '',
          //   };
          // }),
        };
        // this.router.navigate([], {
        //   replaceUrl: true, relativeTo: this.route,
        //   queryParams: this.filter,
        // });
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: OrderFilter) => item.code == this.filter.code);
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
    this.GetAllPartner();
    this.GetAllItem();
    this.search(true);
  }

  reload() {
    this.selectedStates = [];
    this.filter = new OrderReleaseFilter();
    this.search(true);
  }

  onChangePage(pageNumber: number) {
    this.filter.currentPage = pageNumber;
    this.search();
  }

  pageSizeChange(pageSize: number) {
    this.filter.currentPage = 1;
    this.filter.pageSize = pageSize;
    this.search();
  }

  selectOrder(item: OrderModel) {
    const index = this.orderCodesSelected.findIndex((o: string) => o == item.code);
    if (index >= 0) {
      this.orderCodesSelected = this.orderCodesSelected.filter((o: string) => o != item.code);
    } else {
      this.orderCodesSelected = [...this.orderCodesSelected, item.code];
    }
  }

  selectAll(e: any) {
    if (e.target.checked) {
      this.orderCodesSelected = this.paginationResult.data.map((item: any) => item.code);
    } else {
      this.orderCodesSelected = [];
    }
  }

  isChecked(item: OrderModel) {
    const index = this.orderCodesSelected.findIndex((o: string) => o == item.code);
    if (index >= 0) {
      return true;
    } else {
      return false;
    }
  }

  openInforOR(item: any, orderDetail: any) {
    this.drawerService
      .open(OrderReleaseInfoComponent, {
        orderCode: item.code,
        orderDetail: orderDetail,
      })
      .subscribe((result) => {
        if (result?.status) {
          const index = this.paginationResult.data.findIndex((o: any) => o.code == result.orderCode);
          if (index < 0) {
            return;
          }
          const orderReleases = this.paginationResult.data[index].orderReleases;
          const indexOR = orderReleases.findIndex((or: any) => or.code == result.orderRelease.code);
          if (indexOR < 0) {
            return;
          }
          this.paginationResult.data[index].orderReleases[indexOR] = result.orderRelease;
        }
      });
  }

  openEditOR(item: any, orderDetail: any) {
    this.drawerService
      .open(OrderReleaseEditComponent, {
        itemDetail: item,
        orderDetail: orderDetail,
      })
      .subscribe((result) => {
        if (result?.status) {
          const index = this.paginationResult.data.findIndex((o: any) => o.code == result.orderCode);
          if (index < 0) {
            return;
          }
          const orderReleases = this.paginationResult.data[index].orderReleases;
          const indexOR = orderReleases.findIndex((or: any) => or.code == result.orderRelease.code);
          if (indexOR < 0) {
            return;
          }
          this.paginationResult.data[index].orderReleases[indexOR] = result.orderRelease;
        }
      });
  }

  totalExportNumber(ordersDetail: any) {
    if (!ordersDetail) {
      return 0;
    }
    const itemMain = ordersDetail.find((item: any) => item.isMainItem);
    return itemMain.orderNumber;
  }
  finish() {}
  print() {}
}
