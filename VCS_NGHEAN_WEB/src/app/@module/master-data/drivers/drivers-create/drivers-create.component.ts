import { Component } from '@angular/core';
import { DriversService } from 'src/app/services/MD/drivers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { GlobalService } from 'src/app/services/Common/global.service';
import { environment } from 'src/environments/environment';
import { GuidEmpty } from 'src/app/utils/constant/constant';
@Component({
  selector: 'app-drivers-create',
  templateUrl: './drivers-create.component.html',
  styleUrls: ['./drivers-create.component.scss'],
})
export class DriversCreateComponent {
  DriversForm: FormGroup;
  submitted: boolean = false;
  selectedItem: string = '';
  DriversTypes: any = [];

  imageLeft: string = '/uploads/content/image-thumbnails.jpg';
  imageFront: string = '/uploads/content/image-thumbnails.jpg';
  imageRight: string = '/uploads/content/image-thumbnails.jpg';

  userInfo = this._gs.getUserInfo();
  apiUrlImage = environment.apiUrlImage;

  constructor(
    private _service: DriversService,
    private _gs: GlobalService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.DriversForm = this._fb.group({
      id: GuidEmpty,
      fullName: ['', [this.utils.trimSpace]],
      phoneNumber: [],
      imageLeft: ['', [Validators.required, this.utils.trimSpace]],
      imageFront: ['', [Validators.required, this.utils.trimSpace]],
      imageRight: ['', [Validators.required, this.utils.trimSpace]],
      isActive: 'true',
    });
  }

  ngOnInit() {

  }

  get f() {
    return this.DriversForm.controls;
  }

  close() {
    this.drawerService.close();
    this.DriversForm?.get('id')?.setValue('');
    this.DriversForm?.get('fullName')?.setValue('');
    this.DriversForm?.get('phoneNumber')?.setValue('');
    this.DriversForm?.get('isActive')?.setValue('true');
    this.DriversForm?.get('imageLeft')?.setValue('');
    this.DriversForm?.get('imageFront')?.setValue('');
    this.DriversForm?.get('imageRight')?.setValue('');
  }

  onCreate() {
    this.submitted = true;
    if (this.DriversForm.invalid) {
      return;
    }
    this._service
      .Insert(
        {
          id: GuidEmpty,
          fullName: this.DriversForm.value.fullName,
          phoneNumber: this.DriversForm.value.phoneNumber,
          imageLeft: this.DriversForm.value.imageLeft,
          imageFront: this.DriversForm.value.imageFront,
          imageRight: this.DriversForm.value.imageRight,
          isActive: this.DriversForm.value.isActive === 'true',
        },
        false,
      )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          this.DriversForm?.get('id')?.setValue('');
          this.DriversForm?.get('fullName')?.setValue('');
          this.DriversForm?.get('phoneNumber')?.setValue('');
          this.DriversForm?.get('isActive')?.setValue('true');
          this.DriversForm?.get('imageLeft')?.setValue('');
          this.DriversForm?.get('imageFront')?.setValue('');
          this.DriversForm?.get('imageRight')?.setValue('');
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
