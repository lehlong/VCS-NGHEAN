export interface AccountGroupModel {
  id?: string;
  name?: string;
  notes?: string;
  state?: boolean;
  createBy?: string;
  updateBy?: string;
  createDate?: string;
  updateDate?: string;
  listAccount?: ListAccount[];
  listAccountGroupRight?: listAccountGroupRight[];
  treeRight?: rightOfGroup[]
}

export interface ListAccount {
  userName: string;
  fullName: string;
  groupId: string;
  state: boolean;
  accountGroup?: string;
}

export interface listAccountGroupRight {
  userName?: string;
  fullName?: string;
  groupId?: string;
  state?: boolean;
  accountGroup?: string;
  rightId?: string;
}

export class rightOfGroup {
  id: number = 0;
  name: string = '';
  pId: string = '';
  isChecked: boolean = true;
  orderNumber?: string;
  children: rightOfGroup[] = [];
}

