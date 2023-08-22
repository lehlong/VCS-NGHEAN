export interface OrderCarModel {
    id: string;
    order : number;
    timeCheckIn?: Date;
    notes?: string;
    status?: string;
    vehicle?: string;
    driver?: string;
    doSap?: string;
    areaCode?: string;
    isActive?: boolean;
  }
  