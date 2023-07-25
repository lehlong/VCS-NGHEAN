export interface AdAccount {
  userName: string;
  fullName: string;
  groupId: string;
  isActive: boolean;
  accountGroup: AdAccountGroup;
}
export interface AdAccountCreate {
  userName: string;
  fullName: string;
  phoneNumber: string;
  groupId: string;
  isActive: boolean;
  userType: string;
  address:string;
  email:string;
  areaCode: string;
}

export interface AdAccountGroup {
  id: string;
  name: string;
  isActive: boolean;
  notes: string;
  listAccount: AdAccount[];
}
export interface AdAccountUpdateInfor{
  userName: string,
  fullName: string,
  phoneNumber: string,
  email: string,
  address: string,
  areaCode: string,
}
export interface AdChangePassword {
  userName: string,
  oldPassword: string,
  newPassword: string
}
