import {Component} from '@angular/core';
import {PartnerService} from 'src/app/services/MD/partner.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {PartnerFilter} from 'src/app/@filter/MD/partner-filter.model';
import {optionsGroup} from 'src/app/@filter/MD/partner-filter.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Component({
  selector: 'app-partner-edit',
  templateUrl: './partner-edit.component.html',
  styleUrls: ['./partner-edit.component.scss'],
})
export class PartnerEditComponent {
  partnerForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  isActive: boolean | null = null;
  address: string = '';
  phoneNumber: string = '';
  email: string = '';
  isProvider!: boolean;
  isCustomer!: boolean;
  filter = new PartnerFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: PartnerService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.partnerForm = this._fb.group({
      code: [{value: '', disabled: true}],
      name: ['', [Validators.required, this.utils.trimSpace]],
      isActive: ['', Validators.required],
      address: ['', [Validators.required, this.utils.trimSpace]],
      phoneNumber: ['', [Validators.required, this.utils.trimSpace]],
      email: ['', [Validators.required, Validators.email, this.utils.trimSpace]],
      isProvider: [false, [Validators.required]],
      isCustomer: [false, [Validators.required]],
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  get f() {
    return this.partnerForm.controls;
  }

  ngOnInit() {
    this.partnerForm?.get('code')?.setValue(this.code);
    this.partnerForm?.get('name')?.setValue(this.name);
    this.partnerForm?.get('isActive')?.setValue(this.isActive || false);
    this.partnerForm?.get('address')?.setValue(this.address);
    this.partnerForm?.get('phoneNumber')?.setValue(this.phoneNumber);
    this.partnerForm?.get('email')?.setValue(this.email);
    this.partnerForm?.get('isProvider')?.setValue(this.isProvider);
    this.partnerForm?.get('isCustomer')?.setValue(this.isCustomer);
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
      name: '',
      isActive: '',
      address: '',
      phoneNumber: '',
      email: '',
      isProvider: '',
      isCustomer: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
    this.partnerForm?.get('code')?.setValue('');
    this.partnerForm?.get('name')?.setValue('');
    this.partnerForm?.get('isActive')?.setValue(true);
    this.partnerForm?.get('address')?.setValue('');
    this.partnerForm?.get('phoneNumber')?.setValue('');
    this.partnerForm?.get('email')?.setValue('');
    this.partnerForm?.get('isProvider')?.setValue('');
    this.partnerForm?.get('isCustomer')?.setValue('');
  }

  onEdit() {
    this.submitted = true;
    if (this.partnerForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          name: this.partnerForm.value.name.trim(),
          address: this.partnerForm.value.address.trim(),
          isActive: this.partnerForm.value.isActive,
          phoneNumber: this.partnerForm.value.phoneNumber.toString(),
          email: this.partnerForm.value.email.trim(),
          isProvider: this.partnerForm.value.isProvider,
          isCustomer: this.partnerForm.value.isCustomer,
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
