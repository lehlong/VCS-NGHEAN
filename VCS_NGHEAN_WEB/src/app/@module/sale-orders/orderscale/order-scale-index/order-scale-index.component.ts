import {Component} from '@angular/core';

import {OrderScaleService} from 'src/app/services/MD/orderscale.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {OrderScaleEditComponent} from '../order-scale-edit/order-scale-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {OrderScaleFilter} from 'src/app/@filter/MD/orderscale-filter.model';
import {OrderScaleModel, orderDetails} from 'src/app/models/MD/orderscale.model';
import {Router, ActivatedRoute} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {STATE_ORDER, LIST_STATE} from 'src/app/utils/constant/index';
import {utils} from 'src/app/utils/utils';

@Component({
  selector: 'app-order-scale-index',
  templateUrl: './order-scale-index.component.html',
  styleUrls: ['./order-scale-index.component.scss'],
})
export class OrderScaleIndexComponent {
  listPartnerAll: any = [];
  listItemAll: any = [];

  listPartnerFilter: any = [];
  listItemFilter: any = [];

  selectedStates: any = [];

  displayedColumns: string[] = [
    'index',
    'scaleTypeCode',
    'weight2',
    'customerName',
    'orderReleaseCode',
    'vehicleCode',
    'itemName',
    'weight1',
  ];
  paginationResult!: PaginationResult;
  state_order = STATE_ORDER;
  list_state = LIST_STATE;
  filter = new OrderScaleFilter();

  partnerSelected = {
    code: '',
    name: '',
  };

  itemSelected = {
    code: '',
    name: '',
  };

  constructor(
    private _service: OrderScaleService,
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
    // this.router.navigate([], {
    //   replaceUrl: true,
    //   relativeTo: this.route,
    //   queryParams: {
    //     ...this.filter,
    //     code: item.code,
    //   },
    // });

    this.drawerService
      .open(OrderScaleEditComponent, {
        code: item.code,
        item: item.item,
        itemNumber: item.itemNumber,
        itemCode: item.itemCode,
        orderReleaseCode: item.orderReleaseCode,
        driverName: item.driverName,
        vehicleCode: item.vehicleCode,
        itemProportion: item.itemProportion,
        itemPrice: item.itemPrice,
        itemMoney: item.itemNumber * item.itemPrice,

        customer: {
          customerAddress: item.customerAddress,
          customerCode: item.customerCode,
          customerName: item.customerName,
          customerPhone: item.customerPhone,
        },
        scale: {
          timeWeight1: item.timeWeight1,
          timeWeight2: item.timeWeight2,
          vehicleCode: item.vehicleCode,
          weight: item.weight,
          weight1: item.weight1,
          weight2: item.weight2,
        },
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(OrderScaleIndexComponent)) {
          this.loadInit();
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

        this.itemSelected.code = this.filter.itemCode;
        const itemData = this.listItemAll.find((item: any) => {
          return item.code == this.filter.itemCode;
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
        this.filter.itemCode = this.itemSelected.code;
      } else {
        this.filter.itemCode = '';
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

  // search(first: boolean = false) {
  //   this.handleAutocomplete(first);
  //   if (this.selectedStates?.length > 0) {
  //     this.filter = {
  //       ...this.filter,
  //     };
  //   }

  //   this._service.search().subscribe({
  //     next: ({data}) => {
  //       this.paginationResult = data;
  //       console.log(data);

  //       console.log(this.paginationResult);

  //       this.router.navigate([], {
  //         replaceUrl: true,
  //         relativeTo: this.route,
  //         queryParams: this.filter,
  //       });
  //       if (this.filter.code !== '') {
  //         const detail = data?.data?.find((item: OrderScaleFilter) => item.code == this.filter.code);
  //         if (detail && first) {
  //           this.openEdit(detail);
  //         }
  //       }
  //     },
  //     error: (response) => {
  //       console.log(response);
  //     },
  //   });
  // }

  search(first: boolean = false) {
    this.handleAutocomplete(first);
    if (this.selectedStates?.length > 0) {
      this.filter = {
        ...this.filter,
      };
    }
    console.log(this.filter);

    let filterFormat = {...this.filter};

    this._service.search(filterFormat, true).subscribe({
      next: ({data}) => {
        this.paginationResult = {
          ...data,
          data: data?.data.map((item: OrderScaleModel) => {
            const orderMain = item?.orderDetails?.find((element: orderDetails) => element?.isMainItem);
            return {
              ...item,

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
          const detail = data?.data?.find((item: OrderScaleFilter) => item.code == this.filter.code);
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
    this.filter = new OrderScaleFilter();
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
}
