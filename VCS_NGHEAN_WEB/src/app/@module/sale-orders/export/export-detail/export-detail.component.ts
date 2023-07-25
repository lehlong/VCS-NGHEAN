import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {OrderExportService} from 'src/app/services/SO/orderExport.service';
import {ACTION_ORDER, STATE_ORDER} from 'src/app/utils/constant';

@Component({
  selector: 'app-export-detail',
  templateUrl: './export-detail.component.html',
  styleUrls: ['./export-detail.component.scss'],
})
export class ExportDetailComponent implements OnInit {
  itemDetail: any;
  ACTION_ORDER = ACTION_ORDER;
  STATE_ORDER = STATE_ORDER;
  detailData: any = {};
  code: string = '';
  constructor(
    private _oxs: OrderExportService,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getDetail();
  }

  getDetail() {
    this._oxs.GetDetail(this.code).subscribe((res) => {
      this.itemDetail = res.data;
    });
  }

  close() {
    this.drawerService.close();
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: {}});
    this.drawerService.close();
  }

  totalMoney() {
    const arrMoney = this.itemDetail.exportDetails.map((item: any) => item.sumMoney);
    return (
      arrMoney.reduce((total: number, currentValue: number) => {
        return total + currentValue;
      }) || 0
    );
  }
}
