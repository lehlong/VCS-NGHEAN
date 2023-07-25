import {Component} from '@angular/core';
import {GoodsService} from 'src/app/services/MD/goods.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Component({
  selector: 'app-goods-create',
  templateUrl: './goods-create.component.html',
  styleUrls: ['./goods-create.component.scss'],
})
export class GoodsCreateComponent {
  GoodsForm: FormGroup;
  submitted: boolean = false;
  filterGroup = new BaseFilter();

  constructor(
    private _service: GoodsService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.GoodsForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
    });
  }

  get f() {
    return this.GoodsForm.controls;
  }

  close() {
    this.drawerService.close();
    this.GoodsForm?.get('code')?.setValue('');
    this.GoodsForm?.get('name')?.setValue('');
    this.GoodsForm?.get('isActive')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;
    if (this.GoodsForm.invalid) {
      return;
    }
    this._service
      .Insert(
        {
          code: this.GoodsForm.value.code.trim(),
          name: this.GoodsForm.value.name.trim(),
          isActive: this.GoodsForm.value.isActive,
        },
        false,
      )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          this.GoodsForm?.get('code')?.setValue('');
          this.GoodsForm?.get('name')?.setValue('');
          this.GoodsForm?.get('isActive')?.setValue(true);
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
