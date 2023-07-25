import {Component} from '@angular/core';
import {ProductService} from 'src/app/services/MD/product.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Dropdown} from 'bootstrap';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {optionsGroup} from 'src/app/@filter/MD/product-filter.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductFilter} from 'src/app/@filter/MD/product-filter.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent {
  productForm: FormGroup;
  formulaForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  filter = new ProductFilter();
  unitCodes: any[] = [];
  itemTypes: any[] = [];
  selectedItem: string = '';
  editData: any;
  modalType: string = 'add'; // Mặc định là form thêm sản phẩm, nếu có edit data là form edit
  constructor(
    private _service: ProductService,
    private _service1: DropdownService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.productForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
      unitCode: ['', [Validators.required]],
      typeCode: ['', [Validators.required, this.utils.trimSpace]],
      costPrice: ['', [Validators.required, this.utils.trimSpace]],
      sellPrice: ['', [Validators.required, this.utils.trimSpace]],
      isMainObject: [false, [Validators.required]],
      isQuantitative: [false, [Validators.required]],
    });
    this.formulaForm = this._fb.group({
      itemCode: ['', [Validators.required, this.utils.trimSpace]],
      cement: ['', [Validators.required, Validators.min(0)]],
      stone: ['', [Validators.required, Validators.min(0)]],
      sand: ['', [Validators.required, Validators.min(0)]],
      admixture: ['', [Validators.required, Validators.min(0)]],
      water: ['', [Validators.required, Validators.min(0)]],
    });

    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  get f() {
    return this.productForm.controls;
  }
  get f1() {
    return this.formulaForm.controls;
  }

  ngOnInit(): void {
    if (this.editData) {
      this.productForm.setValue({
        code: this.editData.code,
        name: this.editData.name,
        isActive: !!this.editData.isActive,
        unitCode: this.editData.unitCode,
        typeCode: this.editData.typeCode,
        costPrice: this.editData.costPrice,
        sellPrice: this.editData.sellPrice,
        isMainObject: !!this.editData.isMainObject,
        isQuantitative: !!this.editData.isQuantitative,
      });
      this.formulaForm.setValue({
        itemCode: this.editData.code || '',
        cement: this.editData.itemFormula?.cement || 0,
        stone: this.editData.itemFormula?.stone || 0,
        sand: this.editData.itemFormula?.sand || 0,
        admixture: this.editData.itemFormula?.admixture || 0,
        water: this.editData.itemFormula?.water || 0,
      });
      this.modalType = 'edit';
    }
    this._service1.GetAllUnit().subscribe((result: any) => {
      this.unitCodes = result.data;
    });
    this._service1.GetAllItemType().subscribe((result: any) => {
      this.itemTypes = result.data;
    });
  }
  close() {
    this.filter = {
      ...this.filter,
      code: '',
      name: '',
      isActive: '',
      unitCode: '',
      typeCode: '',
      costPrice: '',
      sellPrice: '',
      isMainObject: '',
      isQuantitative: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
    this.productForm?.get('code')?.setValue('');
    this.productForm?.get('name')?.setValue('');
    this.productForm?.get('isActive')?.setValue(true);
    this.productForm?.get('unitCode')?.setValue('');
    this.productForm?.get('typeCode')?.setValue('');
    this.productForm?.get('costPrice')?.setValue('');
    this.productForm?.get('sellPrice')?.setValue('');
    this.productForm?.get('isMainObject')?.setValue('');
    this.productForm?.get('isQuantitative')?.setValue('');

    this.formulaForm?.get('cement')?.setValue('');
    this.formulaForm?.get('stone')?.setValue('');
    this.formulaForm?.get('sand')?.setValue('');
    this.formulaForm?.get('admixture')?.setValue('');
    this.formulaForm?.get('water')?.setValue('');
  }

  onCreate() {
    this.submitted = true;
    console.log('form:', this.productForm);
    // return;
    if (this.productForm.invalid) {
      return;
    }

    switch (this.modalType) {
      case 'add':
        this._service
          .Insert(
            {
              code: this.productForm.value.code.trim(),
              name: this.productForm.value.name.trim(),
              isActive: this.productForm.value.isActive,
              unitCode: this.productForm.value.unitCode,
              typeCode: this.productForm.value.typeCode,
              costPrice: this.productForm.value.costPrice,
              sellPrice: this.productForm.value.sellPrice,
              isMainObject: this.productForm.value.isMainObject,
              isQuantitative: this.productForm.value.isQuantitative,
              itemFormula: {
                ...this.formulaForm.value,
              },
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
              console.log('test');
            },
          );
        break;
      case 'edit':
        const bodyRequest = {
          code: this.productForm.value.code.trim(),
          name: this.productForm.value.name.trim(),
          isActive: this.productForm.value.isActive,
          unitCode: this.productForm.value.unitCode,
          typeCode: this.productForm.value.typeCode,
          costPrice: this.productForm.value.costPrice,
          sellPrice: this.productForm.value.sellPrice,
          isMainObject: this.productForm.value.isMainObject,
          isQuantitative: this.productForm.value.isQuantitative,
          itemFormula: {
            ...this.formulaForm.value,
          },
        };
        console.log(bodyRequest);

        this._service.Update(bodyRequest).subscribe({
          next: (data) => {
            this.drawerService.returnData(data);
            this.submitted = false;
          },
          error: (error) => {
            console.log('error: ', error);
            console.log('test');
          },
        });
    }
  }
}
