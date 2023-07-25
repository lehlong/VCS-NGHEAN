import { Component } from '@angular/core';
import { VehicleService } from 'src/app/services/MD/vehicle.service';
import { VehicleTypeService } from 'src/app/services/MD/vehicle-type.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { VehicleFilter } from 'src/app/@filter/MD/vehicle-filter.model';
import { environment } from 'src/environments/environment';
import { GlobalService } from 'src/app/services/Common/global.service';
@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.scss'],
})
export class VehicleEditComponent {
  vehicleForm: FormGroup;
  submitted: boolean = false;

  userInfo = this._gs.getUserInfo();
  apiUrlImage = environment.apiUrlImage;

  code: string = '';
  imagePlate: string = '';
  imageCar: string = '';
  note: string = '';
  isActive: boolean | null = null;

  filter = new VehicleFilter();

  constructor(
    private _service: VehicleService,
    private _gs: GlobalService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.vehicleForm = this._fb.group({
      code: [{ value: '', disabled: true }],
      imagePlate: ['', [this.utils.trimSpace]],
      imageCar: ['', [this.utils.trimSpace]],
      note: ['', [Validators.required]],
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
    return this.vehicleForm.controls;
  }

  ngOnInit() {
    this.vehicleForm?.get('code')?.setValue(this.code);
    this.vehicleForm?.get('imagePlate')?.setValue(this.imagePlate);
    this.vehicleForm?.get('imageCar')?.setValue(this.imageCar);
    this.vehicleForm?.get('note')?.setValue(this.note);
    this.vehicleForm?.get('isActive')?.setValue(this.isActive);
  }

  close() {
    this.filter = {
      ...this.filter,
    };
    this.router.navigate([], { replaceUrl: true, relativeTo: this.route, queryParams: this.filter });
    this.drawerService.close();
    this.vehicleForm?.get('code')?.setValue('');
    this.vehicleForm?.get('imageCar')?.setValue('');
    this.vehicleForm?.get('imagePlate')?.setValue('');
    this.vehicleForm?.get('note')?.setValue(0);
    this.vehicleForm?.get('isActive')?.setValue(true);
  }

  onEdit() {
    this.submitted = true;
    if (this.vehicleForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          imageCar: this.vehicleForm.value.imageCar,
          imagePlate: this.vehicleForm.value.imagePlate,
          note: this.vehicleForm.value.note,
          isActive: this.vehicleForm.value.isActive,
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
