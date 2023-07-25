import { Component } from '@angular/core';
import { DriversService } from 'src/app/services/MD/drivers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DriversFilter } from 'src/app/@filter/MD/drivers-filter.model';
import { environment } from 'src/environments/environment';
import { GlobalService } from 'src/app/services/Common/global.service';
@Component({
  selector: 'app-drivers-edit',
  templateUrl: './drivers-edit.component.html',
  styleUrls: ['./drivers-edit.component.scss'],
})
export class DriversEditComponent {
  DriversForm: FormGroup;
  submitted: boolean = false;

  userInfo = this._gs.getUserInfo();
  apiUrlImage = environment.apiUrlImage;

  id: string = '';
  fullName : string ='';
  phoneNumber : string ='';
  imageLeft: string = '';
  imageFront: string = '';
  imageRight:string ='';
  isActive: boolean | null = null;

  filter = new DriversFilter();

  constructor(
    private _service: DriversService,
    private _gs: GlobalService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.DriversForm = this._fb.group({
      id: [{ value: '', disabled: true }],
      fullName: ['', [this.utils.trimSpace]],
      phoneNumber: ['', [this.utils.trimSpace]],
      imageLeft: ['', [this.utils.trimSpace]],
      imageFront: ['', [this.utils.trimSpace]],
      imageRight: ['', [this.utils.trimSpace]],
      isActive: ['true', [Validators.required]],
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  get f() {
    return this.DriversForm.controls;
  }

  ngOnInit() {
    this.DriversForm?.get('id')?.setValue(this.id);
    this.DriversForm?.get('fullName')?.setValue(this.fullName);
    this.DriversForm?.get('phoneNumber')?.setValue(this.phoneNumber);
    this.DriversForm?.get('imageLeft')?.setValue(this.imageLeft);
    this.DriversForm?.get('imageFront')?.setValue(this.imageFront);
    this.DriversForm?.get('imageRight')?.setValue(this.imageRight);
    this.DriversForm?.get('isActive')?.setValue(this.isActive);
  }

  close() {
    this.filter = {
      ...this.filter,
    };
    this.router.navigate([], { replaceUrl: true, relativeTo: this.route, queryParams: this.filter });
    this.drawerService.close();
    this.DriversForm?.get('id')?.setValue('');
    this.DriversForm?.get('fullName')?.setValue('');
    this.DriversForm?.get('phoneNumber')?.setValue('');
    this.DriversForm?.get('imageLeft')?.setValue('');
    this.DriversForm?.get('imageFront')?.setValue('');
    this.DriversForm?.get('imageRight')?.setValue('');
    this.DriversForm?.get('isActive')?.setValue(true);
  }

  onEdit() {
    this.submitted = true;
    if (this.DriversForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          id: this.id.trim(),
          fullName: this.DriversForm.value.fullName,
          phoneNumber: this.DriversForm.value.phoneNumber,
          imageLeft: this.DriversForm.value.imageLeft,
          imageFront: this.DriversForm.value.imageFront,
          imageRight: this.DriversForm.value.imageRight,
          isActive: this.DriversForm.value.isActive,
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

  captureImageLeft() {
    this._service.CaptureImage(this.userInfo.userName).subscribe((data) => {
      this.imageLeft = data.data
      this.DriversForm?.get('imageLeft')?.setValue(data.data);
    })
  }

  captureImageFront() {
    this._service.CaptureImage(this.userInfo.userName).subscribe((data) => {
      this.imageFront = data.data
      this.DriversForm?.get('imageFront')?.setValue(data.data);
    })
  }

  captureImageRight() {
    this._service.CaptureImage(this.userInfo.userName).subscribe((data) => {
      this.imageRight = data.data
      this.DriversForm?.get('imageRight')?.setValue(data.data);
    })
  }
}
