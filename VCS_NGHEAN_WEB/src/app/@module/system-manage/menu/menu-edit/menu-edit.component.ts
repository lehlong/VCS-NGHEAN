import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MenuService} from 'src/app/services/AD/menu.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss'],
})
export class MenuEditComponent {
  nodeForm: FormGroup;
  submitted: boolean = false;
  id: string = '';
  name: string = '';
  pId: string = '';
  rightId: string = '';
  url: string = '';
  icon: string = '';
  orderNumber: number = 0;
  @Output() updateNodeForm = new EventEmitter<any>();

  constructor(private _ms: MenuService, private _fb: FormBuilder, private _ds: DrawerService) {
    this.nodeForm = this._fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      url: ['', Validators.required],
      pId: [''],
      icon: [''],
      rightId: [''],
      orderNumber: [''],
    });
  }

  get f() {
    return this.nodeForm.controls;
  }

  ngOnInit() {
    this.nodeForm?.get('id')?.setValue(this.id);
    this.nodeForm?.get('name')?.setValue(this.name);
    this.nodeForm?.get('pId')?.setValue(this.pId);
    this.nodeForm?.get('rightId')?.setValue(this.rightId);
    this.nodeForm?.get('url')?.setValue(this.url);
    this.nodeForm?.get('icon')?.setValue(this.icon);
    this.nodeForm?.get('orderNumber')?.setValue(this.orderNumber);
  }

  close() {
    this._ds.close();
    this.nodeForm?.get('id')?.setValue('');
    this.nodeForm?.get('name')?.setValue('');
    this.nodeForm?.get('pId')?.setValue('');
    this.nodeForm?.get('url')?.setValue('');
    this.nodeForm?.get('icon')?.setValue('');
    this.nodeForm?.get('rightId')?.setValue('');
    this.nodeForm?.get('orderNumber')?.setValue('');
  }

  onEdit() {
    this.submitted = true;
    if (this.nodeForm.invalid) {
      return;
    }
    this._ms
      .Update({
        id: this.nodeForm.value.id,
        name: this.nodeForm.value.name,
        pId: this.nodeForm.value.pId,
        rightId: this.nodeForm.value.rightId,
        url: this.nodeForm.value.url,
        icon: this.nodeForm.value.icon,
      })
      .subscribe(
        (data: any): void => {
          data.action = 'update';
          data.data = this.nodeForm.value;
          this._ds.returnData(data);
          this.submitted = false;
        },
        (error: any) => {
          console.log('error: ', error);
        },
      );
  }

  onDelete() {
    this._ms
      .delete({
        id: this.nodeForm.value.id,
        name: this.nodeForm.value.name,
        pId: this.nodeForm.value.pId,
      })
      .subscribe(
        (data: any): void => {
          data.action = 'delete';
          this._ds.returnData(data);
          this.submitted = false;
        },
        (error: any) => {
          console.log('error: ', error);
        },
      );
  }
}
