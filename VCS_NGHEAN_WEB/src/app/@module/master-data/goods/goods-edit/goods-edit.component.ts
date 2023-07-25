import {Component} from '@angular/core';
import {GoodsService} from 'src/app/services/MD/goods.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {GoodsFilter} from 'src/app/@filter/MD/goods-filter.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Component({
  selector: 'app-goods-edit',
  templateUrl: './goods-edit.component.html',
  styleUrls: ['./goods-edit.component.scss'],
})
export class GoodsEditComponent {
  GoodsForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  isActive: boolean | null = null;
  filter = new GoodsFilter();
  filterGroup = new BaseFilter();

  constructor(
    private _service: GoodsService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.GoodsForm = this._fb.group({
      code: [{value: '', disabled: true}],
      name: ['', [Validators.required, this.utils.trimSpace]],
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
    return this.GoodsForm.controls;
  }

  ngOnInit() {
    this.GoodsForm?.get('code')?.setValue(this.code);
    this.GoodsForm?.get('name')?.setValue(this.name);
    this.GoodsForm?.get('isActive')?.setValue(this.isActive || false);
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
    this.GoodsForm?.get('code')?.setValue('');
    this.GoodsForm?.get('name')?.setValue('');
    this.GoodsForm?.get('isActive')?.setValue(true);
  }

  onEdit() {
    this.submitted = true;
    if (this.GoodsForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          name: this.GoodsForm.value.name.trim(),
          isActive: this.GoodsForm.value.isActive,
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
