import { Component, OnInit } from '@angular/core';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';
import { CheckInModel } from 'src/app/models/WS/check-in.model';
import { GlobalService } from 'src/app/services/Common/global.service';
import { CameraService } from 'src/app/services/MD/camera.service';
import { VehicleService } from 'src/app/services/MD/vehicle.service';
import { CheckInService } from 'src/app/services/WS/check-in.service';
import { GuidEmpty } from 'src/app/utils/constant/constant';
import { environment } from 'src/environments/environment';
declare var flvjs: any

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {
  userInfo = this._gs.getUserInfo();
  cameraIn: string = '';
  filterCamera = new BaseFilter();

  dataCheckIn: CheckInModel = {
    id: GuidEmpty,
    timeCheckIn: new Date(),
    vehicle: '',
    driver: '',
    doSap: '',
    isActive: true,
  }

  apiUrlImage = environment.apiUrlImage;
  imageThumbnails : string = '/uploads/content/image-thumbnails-small.jpg';
  imagePlate: string = this.imageThumbnails;

  optionsVehicle: any[] = [];
  filterVehicle = new BaseFilter();

  lstOrderSmo : any[] =[];

  constructor(
    private _gs: GlobalService,
    private _vs: VehicleService,
    private _cs: CameraService,
    private _cis: CheckInService
  ) { }
  ngOnInit(): void {
    this.getAllCamera();
    this.getAllVehicle();
    this.getListOrderSmo();
  }

  intervalTime = setInterval(() => { this.dataCheckIn.timeCheckIn = new Date() }, 1000)

  getAllCamera() {
    this.filterCamera.pageSize = 100;
    this._cs.search(this.filterCamera).subscribe({
      next: ({ data }) => {
        this.cameraIn = data?.data?.find((x: { areaCode: any; inOut: string; }) => x.areaCode == this.userInfo.areaCode && x.inOut == 'in')?.linkPlay;
        this.playStreamCamera(this.cameraIn)
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  getListOrderSmo() {
    this._cis.GetListOrderSmo(this.userInfo.areaCode).subscribe({
      next: ({ data }) => {
        this.lstOrderSmo = data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  playStreamCamera(cameraIn: any) {
    var config = {
      enableStashBuffer: false,
      autoCleanupSourceBuffer: true,
      stashInitialSize: 0,
      deferLoadAfterSourceOpen: false,
      accurateSeek: true
    };
    try {
      if (flvjs.isSupported()) {
        var stream_in = document.getElementById('stream_in');
        var flvPlayer_in = flvjs.createPlayer({
          type: 'flv',
          isLive: true,
          url: cameraIn,
        }, config);
        flvPlayer_in.attachMediaElement(stream_in);
        flvPlayer_in.load();
      }
    } catch (ex) {
      console.log(ex)
    }
    let vidIn: any = document.getElementById("stream_in");
    vidIn.onpause = function () { vidIn.play(); };
  }

  getAllVehicle() {
    this.filterVehicle.pageSize = 100;
    this._vs.search(this.filterVehicle).subscribe({
      next: ({ data }) => {
        this.optionsVehicle = data.data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
  onChangeVehicle(e: any) {
    this.filterVehicle.keyWord = e;
    this.getAllVehicle();
  }
  onSelectVehicle(item: any) {
    console.log(item)
  }

  refreshCamera() {
    this._cis.ResetCamera(true);
  }

  refreshTime() {
    this.dataCheckIn.timeCheckIn = new Date();
  }

  //Khi ấn vào checkIn hoặc checkIn lại thì sẽ trả ra data ảnh quét và text biển số
  onClickCheckIn() {
    this._cis.CaptureImage(this.userInfo.userName).subscribe((data) => {
      this.imagePlate = data.data

      var checkPlate = this.optionsVehicle.find(x => x.code == "35K154047");
      if (checkPlate) {
        this.dataCheckIn.vehicle = checkPlate.code;
      }
    })
  }

  onClickCapSo() {
    this._cis.Insert(this.dataCheckIn).subscribe((data) => {
      setTimeout(() => window.location.reload(), 1000);
    })
  }
}
