import {Component, OnInit} from '@angular/core';
import {CameraService} from 'src/app/services/MD/camera.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsArea, optionsInOut} from 'src/app/@filter/MD/camera-filter.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';
import { GuidEmpty } from 'src/app/utils/constant/constant';
import { AreaService } from 'src/app/services/MD/area.service';

@Component({
  selector: 'app-camera-create',
  templateUrl: './camera-create.component.html',
  styleUrls: ['./camera-create.component.scss'],
})
export class CameraCreateComponent implements OnInit{
  CameraForm: FormGroup;
  submitted: boolean = false;
  optionsArea: optionsArea[] = [];
  filterArea = new BaseFilter();
  filterInOut = new BaseFilter();

  optionsInOut: optionsInOut[] = [
    {
      id: 'in',
      name: 'Vào'
    },
    {
      id: 'out',
      name: 'Ra'
    }
  ]

  constructor(
    private _service: CameraService,
    private _areas: AreaService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.CameraForm = this._fb.group({
      id: [],
      name: ['', [Validators.required, this.utils.trimSpace]],
      sourceRtsp: [],
      linkPlay: ['', [Validators.required, this.utils.trimSpace]],
      linkCapture: ['', [Validators.required, this.utils.trimSpace]],
      userName: ['', [Validators.required, this.utils.trimSpace]],
      password: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
      areaCode: [true, [Validators.required]],
      inOut: [true, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllArea();
  }
  getAllArea() {
    this.filterArea.pageSize = 100;
    this._areas.search(this.filterArea).subscribe({
      next: ({data}) => {
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
    this.CameraForm?.get('areaCode')?.setValue(item.code);
  }

  onChangeInOut(e: any) {
    this.filterInOut.keyWord = e;
    this.getAllArea();
  }
  onSelectItemInOut(item: any) {
    this.CameraForm?.get('inOut')?.setValue(item.id);
  }

  get f() {
    return this.CameraForm.controls;
  }

  close() {
    this.drawerService.close();
    this.CameraForm?.get('id')?.setValue('');
    this.CameraForm?.get('name')?.setValue('');
    this.CameraForm?.get('sourceRtsp')?.setValue('');
    this.CameraForm?.get('linkPlay')?.setValue('');
    this.CameraForm?.get('areaCode')?.setValue('');
    this.CameraForm?.get('inOut')?.setValue('');
    this.CameraForm?.get('isActive')?.setValue(true);
    this.CameraForm?.get('linkCapture')?.setValue('');
    this.CameraForm?.get('userName')?.setValue('');
    this.CameraForm?.get('password')?.setValue('');
  }

  onCreate() {
    this.submitted = true;
    if (this.CameraForm.invalid) {
      return;
    }
    this._service
      .Insert(
        {
          id: GuidEmpty,
          name: this.CameraForm.value.name.trim(),
          sourceRtsp: this.CameraForm.value.sourceRtsp?.trim(),
          linkPlay: this.CameraForm.value.linkPlay.trim(),
          isActive: this.CameraForm.value.isActive,
          areaCode: this.CameraForm.value.areaCode,
          inOut: this.CameraForm.value.inOut,
          linkCapture: this.CameraForm.value.linkCapture,
          userName: this.CameraForm.value.userName,
          password: this.CameraForm.value.password,
        },
        false,
      )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          this.CameraForm?.get('id')?.setValue('');
          this.CameraForm?.get('name')?.setValue('');
          this.CameraForm?.get('sourceRtsp')?.setValue('');
          this.CameraForm?.get('linkPlay')?.setValue('');
          this.CameraForm?.get('areaCode')?.setValue('');
          this.CameraForm?.get('inOut')?.setValue('');
          this.CameraForm?.get('isActive')?.setValue(true);
          this.CameraForm?.get('linkCapture')?.setValue('');
          this.CameraForm?.get('userName')?.setValue('');
          this.CameraForm?.get('password')?.setValue('');
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
