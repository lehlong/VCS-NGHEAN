import { Component, OnInit } from '@angular/core';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';
import { optionsGroup } from 'src/app/@filter/MD/area-filter.model';
import { GlobalService } from 'src/app/services/Common/global.service';
import { CameraService } from 'src/app/services/MD/camera.service';
import { VehicleService } from 'src/app/services/MD/vehicle.service';
declare var flvjs: any

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  userInfo = this._gs.getUserInfo();
  cameraIn :string ='';
  filterCamera = new BaseFilter();

  optionsVehicle: optionsGroup[] = [];
  filterVehicle = new BaseFilter();

  constructor(
    private _gs: GlobalService,
    private _vs : VehicleService,
    private _cs: CameraService,
  ) { }
  ngOnInit(): void {
    this.getAllCamera();
    this.getAllVehicle();
  }

  getAllCamera() {
    this.filterCamera.pageSize = 100;
    this._cs.search(this.filterCamera).subscribe({
      next: ({ data }) => {
        this.cameraIn = data?.data?.find((x: { areaCode: any; inOut: string; }) => x.areaCode == this.userInfo.areaCode && x.inOut == 'out')?.linkPlay;
        this.playStreamCamera(this.cameraIn)
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  playStreamCamera(cameraOut: any) {
    var config = {
      enableStashBuffer: false,
      autoCleanupSourceBuffer: true,
      stashInitialSize: 0,
      deferLoadAfterSourceOpen: false,
      accurateSeek: true
    };
    try {
      if (flvjs.isSupported()) {
        var stream_out = document.getElementById('stream_out');
        var flvPlayer_out = flvjs.createPlayer({
          type: 'flv',
          isLive: true,
          url: cameraOut,
        }, config);
        flvPlayer_out.attachMediaElement(stream_out);
        flvPlayer_out.load();
      }
    } catch (ex) {
      console.log(ex)
    }
    let vidOut: any = document.getElementById("stream_out");
    vidOut.onpause = function () { vidOut.play(); };
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

  refreshCamera(){
    window.location.reload();
  }
}
