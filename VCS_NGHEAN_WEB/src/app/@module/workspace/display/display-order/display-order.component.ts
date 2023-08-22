import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/Common/global.service';
import { OrderCarService } from 'src/app/services/WS/order-car.service';

@Component({
  selector: 'app-display-order',
  templateUrl: './display-order.component.html',
  styleUrls: ['./display-order.component.scss']
})
export class DisplayOrderComponent implements OnInit {

  userInfo = this._gs.getUserInfo();

  textToShow: string = "";
  count: number = 0;

  filter: any = {
    areaCode: this.userInfo?.areaCode
  }
  dataOrder: any[] = [];
  constructor(private _ocs: OrderCarService, private _gs: GlobalService) { }
  ngOnInit(): void {
    this.getAllOrder();
    setInterval(function () {
      window.location.reload()
    }, 10000)
  }

  getAllOrder() {
    this._ocs.search(this.filter).subscribe({
      next: (data) => {
        this.dataOrder = data.data.data;
        this.count = this.dataOrder.length;
        this.textToShow = `Xin mời số: ${this.dataOrder[0]?.order} - ${this.dataOrder[0]?.vehicle} - ${this.dataOrder[0]?.driver} vào lấy tích kê.`
      }
    })
  }
}
