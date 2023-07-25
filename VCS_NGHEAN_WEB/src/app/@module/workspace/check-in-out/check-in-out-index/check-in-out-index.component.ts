import { Component, OnInit } from '@angular/core';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';
import { optionsGroup } from 'src/app/@filter/MD/area-filter.model';
import { CameraModel } from 'src/app/models/MD/camera.model';
import { GlobalService } from 'src/app/services/Common/global.service';
import { AreaService } from 'src/app/services/MD/area.service';
import { CameraService } from 'src/app/services/MD/camera.service';
declare var flvjs: any

@Component({
  selector: 'app-check-in-out-index',
  templateUrl: './check-in-out-index.component.html',
  styleUrls: ['./check-in-out-index.component.scss']
})
export class CheckInOutIndexComponent implements OnInit {

  userInfo = this._gs.getUserInfo();
  canPlayStreamIn: boolean = true;
  canPlayStreamOut: boolean = true;

  optionsArea: optionsGroup[] = [];
  filterArea = new BaseFilter();
  filterCamera = new BaseFilter();
  allCamera: CameraModel[] = [];

  cameraIn?: string = '';
  cameraOut?: string = '';

  constructor(
    private _gs: GlobalService,
    private _cs: CameraService,
    private _areas: AreaService,
  ) { }

  ngOnInit(): void {
    this.getAllArea();
    this.getAllCamera();
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

  onChangeArea(e: any) {
    this.filterArea.keyWord = e;
    this.getAllArea();
  }

  onSelectItemArea(item: any) {
    this.cameraIn = this.allCamera.find(x => x.areaCode == item.code && x.inOut == 'in')?.linkPlay;
    this.cameraOut = this.allCamera.find(x => x.areaCode == item.code && x.inOut == 'out')?.linkPlay;
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
      this.canPlayStreamIn = false
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
      this.canPlayStreamOut = false
    }

    let vidIn: any = document.getElementById("stream_in");
    let vidOut: any = document.getElementById("stream_out");
    vidIn.onpause = function () { vidIn.play(); };
    vidOut.onpause = function () { vidOut.play(); };
  }
}
