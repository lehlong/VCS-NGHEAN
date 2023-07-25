import {orderDetails} from './../../../../models/SO/order.model';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderFilter} from 'src/app/@filter/SO/order-filter.model';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {OrderService} from 'src/app/services/SO/order.service';
import {LIST_STATE, STATE_ORDER} from 'src/app/utils/constant';
import {OrderCreateComponent} from '../../order/order-create/order-create.component';
import {OrderIndexComponent} from '../../order/order-index/order-index.component';
import {OrderEditComponent} from '../../order/order-edit/order-edit.component';
import {OrderModel} from 'src/app/models/SO/order.model';
import {utils} from 'src/app/utils/utils';
import {OrderExportService} from 'src/app/services/SO/orderExport.service';
import {OrderExportFilter} from 'src/app/@filter/SO/export-filter.model';
import {ExportDetailComponent} from '../export-detail/export-detail.component';

@Component({
  selector: 'app-export-index',
  templateUrl: './export-index.component.html',
  styleUrls: ['./export-index.component.scss'],
})
export class ExportIndexComponent {
  listPartnerAll: any = [];
  listItemAll: any = [];

  listPartnerFilter: any = [];
  listItemFilter: any = [];

  selectedStates: any = [];

  displayedColumns: string[] = [
    'index',
    'code',
    'orderCode',
    'exportDate',
    'partnerName',
    'itemName',
    'orderNumber',
    'sumMoney',
  ];
  paginationResult!: PaginationResult;
  state_order = STATE_ORDER;
  list_state = LIST_STATE;
  filter = new OrderExportFilter();

  partnerSelected = {
    code: '',
    name: '',
  };

  itemSelected = {
    code: '',
    name: '',
  };

  constructor(
    private _service: OrderExportService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: utils,
  ) {
    this.route.queryParams.subscribe((params: any) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
      if (params?.States !== '') {
        this.selectedStates = this.list_state.filter((item: any) => {
          return params?.States?.includes(item.value);
        });
      }
    });
  }

  ngOnInit(): void {
    this.loadInit(true);
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
    this.drawerService.open(ExportDetailComponent, {
      code: item.code,
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

  onSelectionChange(e: any) {
    const checkStates = this.filter.States?.filter((item: string) => item !== '');
    if (checkStates && checkStates?.length > 0) {
      this.filter = {
        ...this.filter,
        States: this.filter.States?.filter((item: string) => item !== ''),
      };
    }
  }

  search(first: boolean = false) {
    this.handleAutocomplete(first);
    if (this.selectedStates?.length > 0) {
      this.filter = {
        ...this.filter,
        States: this.selectedStates.map((item: any) => item.value),
      };
    }
    const checkStates = this.filter.States?.filter((item: string) => item !== '');
    let filterFormat = {...this.filter};
    if ('States' in filterFormat && (!checkStates || checkStates?.length == 0)) {
      delete filterFormat.States;
    } else {
      filterFormat = {
        ...filterFormat,
        States: filterFormat.States?.filter((item: string) => item !== ''),
      };
    }
    this._service.search(filterFormat, true).subscribe({
      next: ({data}) => {
        this.paginationResult = {
          ...data,
          data: data?.data.map((item: OrderModel) => {
            const orderMain = item?.orderDetails?.find((element: orderDetails) => element?.isMainItem);
            return {
              ...item,
              itemName: orderMain?.item?.name || '',
              orderNumber: orderMain?.orderNumber || 0,
              partnerName: item?.partner?.name || '',
              phoneNumber: item?.partner?.phoneNumber || '',
            };
          }),
        };
        this.router.navigate([], {
          replaceUrl: true,
          relativeTo: this.route,
          queryParams: this.filter,
        });
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: OrderFilter) => item.code == this.filter.code);
          if (detail && first) {
            this.openEdit(detail);
          }
        }
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  loadInit(first: boolean = false) {
    this.GetAllPartner();
    this.GetAllItem();
    this.search(first);
    this.utils.handleTable();
  }

  reload() {
    this.selectedStates = [];
    this.filter = new OrderFilter();
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

  getOrderNumber(order: any) {
    const itemMain = order.orderDetails.find((o: any) => o.isMainItem);
    return itemMain.orderNumber;
  }
}
