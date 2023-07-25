export class AccountFilter {
  currentPage: number = 1;
  pageSize: number = 20;
  keyWord: string = '';
  groupId: string = '';
  isActive: boolean | string = '';
}

export interface optionsGroup {
  id: string;
  name: string;
}

export interface optionsUserType {
  code: string;
  name: string;
}

export interface optionsArea {
  code: string;
  name: string;
}
