import {Component} from '@angular/core';
import {VehicleService} from 'src/app/services/MD/vehicle.service';
import {VehicleTypeService} from 'src/app/services/MD/vehicle-type.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import { GlobalService } from 'src/app/services/Common/global.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.component.html',
  styleUrls: ['./vehicle-create.component.scss'],
})
export class VehicleCreateComponent {
  vehicleForm: FormGroup;
  submitted: boolean = false;
  selectedItem: string = '';
  vehicleTypes: any = [];

  imagePlate : string = '/uploads/content/image-thumbnails.jpg';
  imageCar : string = '/uploads/content/image-thumbnails.jpg';

  userInfo = this._gs.getUserInfo();
  apiUrlImage = environment.apiUrlImage;

  constructor(
    private _service: VehicleService,
    private _gs : GlobalService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.vehicleForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      imageCar: ['', [Validators.required, this.utils.trimSpace]],
      imagePlate: ['', [Validators.required, this.utils.trimSpace]],
      isActive: 'true',
    });
  }

  ngOnInit() {
    
  }

  get f() {
    return this.vehicleForm.controls;
  }

  close() {
    this.drawerService.close();
    this.vehicleForm?.get('code')?.setValue('');
    this.vehicleForm?.get('imagePlate')?.setValue('');
    this.vehicleForm?.get('imageCar')?.setValue('');
    this.vehicleForm?.get('isActive')?.setValue('true');
    this.vehicleForm?.get('note')?.setValue('');
  }

  onCreate() {
    this.submitted = true;
    if (this.vehicleForm.invalid) {
      return;
    }
    this._service
      .Insert(
        {
          code: this.vehicleForm.value.code.trim(),
          imageCar: this.vehicleForm.value.imageCar,
          imagePlate: this.vehicleForm.value.imagePlate,
          isActive: this.vehicleForm.value.isActive === 'true',
          note: this.vehicleForm.value.note,
        },
        false,
      )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          this.vehicleForm?.get('code')?.setValue('');
          this.vehicleForm?.get('imagePlate')?.setValue('');
          this.vehicleForm?.get('imageCar')?.setValue('');
          this.vehicleForm?.get('isActive')?.setValue('true');
          this.vehicleForm?.get('note')?.setValue('');
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
  captureImagePlate() {
    this._service.CaptureImage(this.userInfo.userName).subscribe((data) => {
      this.imagePlate = data.data
      this.vehicleForm?.get('imagePlate')?.setValue(data.data);
    })
  }

  captureImageCar() {
    this._service.CaptureImage(this.userInfo.userName).subscribe((data) => {
      this.imageCar = data.data
      this.vehicleForm?.get('imageCar')?.setValue(data.data);
    })
  }
}
