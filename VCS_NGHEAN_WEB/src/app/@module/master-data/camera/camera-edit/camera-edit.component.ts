import { Component } from '@angular/core';
import { CameraService } from 'src/app/services/MD/camera.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CameraFilter, optionsInOut } from 'src/app/@filter/MD/camera-filter.model';
import { optionsArea } from 'src/app/@filter/MD/camera-filter.model';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';
import { AreaService } from 'src/app/services/MD/area.service';

@Component({
  selector: 'app-camera-edit',
  templateUrl: './camera-edit.component.html',
  styleUrls: ['./camera-edit.component.scss'],
})
export class CameraEditComponent {
  CameraForm: FormGroup;
  submitted: boolean = false;
  id: string = '';
  name: string = '';
  sourceRtsp: string = '';
  linkPlay: string = '';
  areaCode: string = '';
  inOut: string = '';
  areaName: string = '';
  inOutName: string = '';
  linkCapture: string = '';
  userName : string = '';
  password :string = '';
  isActive: boolean | null = null;
  filter = new CameraFilter();
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
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.CameraForm = this._fb.group({
      id: [{ value: '', disabled: true }],
      name: ['', [Validators.required, this.utils.trimSpace]],
      sourceRtsp: ['', [this.utils.trimSpace]],
      linkPlay: ['', [Validators.required, this.utils.trimSpace]],
      linkCapture: ['', [Validators.required, this.utils.trimSpace]],
      userName: ['', [Validators.required, this.utils.trimSpace]],
      password: ['', [Validators.required, this.utils.trimSpace]],
      isActive: ['', Validators.required],
      inOut: ['', Validators.required],
      areaCode: ['', Validators.required],
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  get f() {
    return this.CameraForm.controls;
  }

  ngOnInit() {
    this.CameraForm?.get('id')?.setValue(this.id);
    this.CameraForm?.get('name')?.setValue(this.name);
    this.CameraForm?.get('sourceRtsp')?.setValue(this.sourceRtsp);
    this.CameraForm?.get('linkPlay')?.setValue(this.linkPlay);
    this.CameraForm?.get('isActive')?.setValue(this.isActive || false);
    this.CameraForm?.get('areaCode')?.setValue(this.areaCode);
    this.CameraForm?.get('inOut')?.setValue(this.inOut);
    this.CameraForm?.get('linkCapture')?.setValue(this.linkCapture);
    this.CameraForm?.get('userName')?.setValue(this.userName);
    this.CameraForm?.get('password')?.setValue(this.password);
    this.CameraForm?.get('areaName')?.setValue(this.areaName);
    this.getAllArea();
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
  onSelectArea(item: any) {
    this.CameraForm?.get('areaCode')?.setValue(item.code);
  }

  onChangeInOut(e: any) {
    this.filterInOut.keyWord = e;
  }
  onSelectInOut(item: any) {
    this.CameraForm?.get('inOut')?.setValue(item.id);
  }

  close() {
    this.filter = {
      ...this.filter,
      id: '',
      name: '',
      sourceRtsp: '',
      linkPlay: '',
      areaCode: '',
      inOut: '',
      isActive: '',
    };
    this.router.navigate([], { replaceUrl: true, relativeTo: this.route, queryParams: this.filter });
    this.drawerService.close();
    this.CameraForm?.get('id')?.setValue('');
    this.CameraForm?.get('name')?.setValue('');
    this.CameraForm?.get('sourceRtsp')?.setValue('');
    this.CameraForm?.get('linkPlay')?.setValue('');
    this.CameraForm?.get('isActive')?.setValue(true);
    this.CameraForm?.get('areaCode')?.setValue('');
    this.CameraForm?.get('inOut')?.setValue('');
    this.CameraForm?.get('linkCapture')?.setValue('');
    this.CameraForm?.get('userName')?.setValue('');
    this.CameraForm?.get('password')?.setValue('');
  }

  onEdit() {
    debugger
    this.submitted = true;
    if (this.CameraForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          id: this.id.trim(),
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
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
