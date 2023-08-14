import {Component} from '@angular/core';
import {AreaService} from 'src/app/services/MD/area.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {AreaFilter} from 'src/app/@filter/MD/area-filter.model';
import {optionsGroup} from 'src/app/@filter/MD/area-filter.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Component({
  selector: 'app-area-edit',
  templateUrl: './area-edit.component.html',
  styleUrls: ['./area-edit.component.scss'],
})
export class AreaEditComponent {
  areaForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  dbTgbx: string = '';
  dbTdh: string = '';
  dbTdhE5: string = '';
  isActive: boolean | null = null;
  filter = new AreaFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: AreaService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.areaForm = this._fb.group({
      code: [{value: '', disabled: true}],
      name: ['', [Validators.required, this.utils.trimSpace]],
      dbTgbx: ['', [this.utils.trimSpace]],
      dbTdh: ['', [this.utils.trimSpace]],
      dbTdhE5: ['', [this.utils.trimSpace]],
      isActive: ['', Validators.required],
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  get f() {
    return this.areaForm.controls;
  }

  ngOnInit() {
    this.areaForm?.get('code')?.setValue(this.code);
    this.areaForm?.get('name')?.setValue(this.name);
    this.areaForm?.get('dbTgbx')?.setValue(this.dbTgbx);
    this.areaForm?.get('dbTdh')?.setValue(this.dbTdh);
    this.areaForm?.get('dbTdhE5')?.setValue(this.dbTdhE5);
    this.areaForm?.get('isActive')?.setValue(this.isActive || false);
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
      name: '',
      isActive: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
    this.areaForm?.get('code')?.setValue('');
    this.areaForm?.get('name')?.setValue('');
    this.areaForm?.get('dbTgbx')?.setValue('');
    this.areaForm?.get('dbTdh')?.setValue('');
    this.areaForm?.get('dbTdhE5')?.setValue('');
    this.areaForm?.get('isActive')?.setValue(true);
  }

  onEdit() {
    this.submitted = true;
    if (this.areaForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          name: this.areaForm.value.name.trim(),
          dbTdh: this.areaForm.value.dbTdh.trim(),
          dbTgbx: this.areaForm.value.dbTgbx.trim(),
          dbTdhE5: this.areaForm.value.dbTdhE5.trim(),
          isActive: this.areaForm.value.isActive,
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
