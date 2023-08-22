import { Component, OnInit } from '@angular/core';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';
import { optionsGroup } from 'src/app/@filter/MD/area-filter.model';
import { CameraModel } from 'src/app/models/MD/camera.model';
import { GlobalService } from 'src/app/services/Common/global.service';
import { AreaService } from 'src/app/services/MD/area.service';
import { CameraService } from 'src/app/services/MD/camera.service';
import { CheckInService } from 'src/app/services/WS/check-in.service';
declare var flvjs: any

@Component({
  selector: 'app-check-in-out-index',
  templateUrl: './check-in-out-index.component.html',
  styleUrls: ['./check-in-out-index.component.scss']
})
export class CheckInOutIndexComponent implements OnInit {

  userInfo = this._gs.getUserInfo();

  optionsArea: any[] = [];
  filterArea = new BaseFilter();
  filterCamera = new BaseFilter();
  allCamera: CameraModel[] = [];

  currentArea: string = this.userInfo.areaCode;

  cameraIn?: string = '';
  cameraOut?: string = '';

  constructor(
    private _gs: GlobalService,
    private _cis: CheckInService,
    private _cs: CameraService,
    private _areas: AreaService,
  ) { }

  ngOnInit(): void {
    this.getAllArea();
    this.getAllCamera();
  }

  resetCamera() {
    this._cis.ResetCamera(true).subscribe({
      next:() =>{
        window.location.reload();
      }
    });
  }

  getAllArea() {
    this.filterArea.pageSize = 100;
    this._areas.search(this.filterArea).subscribe({
      next: ({ data }) => {
        this.optionsArea = data.data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  onSelectItemArea(item: any) {
    this.cameraIn = this.allCamera.find(x => x.areaCode == item && x.inOut == 'in')?.linkPlay;
    this.cameraOut = this.allCamera.find(x => x.areaCode == item && x.inOut == 'out')?.linkPlay;
    this.currentArea = item
    this.playStreamCamera(this.cameraIn, this.cameraOut)
  }

  getAllCamera() {
    this.filterCamera.pageSize = 100;
    this._cs.search(this.filterCamera).subscribe({
      next: ({ data }) => {
        this.allCamera = data.data;
        this.cameraIn = data?.data?.find((x: { areaCode: any; inOut: string; }) => x.areaCode == this.userInfo.areaCode && x.inOut == 'in')?.linkPlay;
        this.cameraOut = data?.data?.find((x: { areaCode: any; inOut: string; }) => x.areaCode == this.userInfo.areaCode && x.inOut == 'out')?.linkPlay;
        this.playStreamCamera(this.cameraIn, this.cameraOut)
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  playStreamCamera(cameraIn: any, cameraOut: any) {
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
    }

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
    }

    let vidIn: any = document.getElementById("stream_in");
    let vidOut: any = document.getElementById("stream_out");
    vidIn.onpause = function () { vidIn.play(); };
    vidOut.onpause = function () { vidOut.play(); };
  }
}
