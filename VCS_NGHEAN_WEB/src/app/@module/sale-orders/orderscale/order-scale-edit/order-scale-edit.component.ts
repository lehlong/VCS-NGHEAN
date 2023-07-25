import {Component, OnInit} from '@angular/core';
import {DrawerService} from 'src/app/services/Common/drawer.service';

@Component({
  selector: 'app-order-scale-edit',
  templateUrl: './order-scale-edit.component.html',
  styleUrls: ['./order-scale-edit.component.scss'],
})
export class OrderScaleEditComponent implements OnInit {
  constructor(private drawerService: DrawerService) {
    this.screenWidth = `${window.innerWidth * 0.65}px`;
  }
  customer: any;
  item: any;
  scale: any;
  screenWidth: any;
  orderReleaseCode: any;
  driverName: any;
  vehicleCode: any;
  itemNumber: any;
  itemCode: any;
  itemProportion: any;
  itemPrice: any;
  itemMoney: any;
  ngOnInit(): void {
    console.log(this.customer);
    console.log(this.scale);
  }
  close() {
    this.drawerService.close();
  }
}
